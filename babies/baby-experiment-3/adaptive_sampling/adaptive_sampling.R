library(tidyverse)
library(Rmisc)
library(dplyr)
library(here)
library(readxl)
library(janitor)
library(nlme)
library(sjmisc)
library(DescTools)


# jspsych files
jspsych_path <- "/Users/galraz1/Developer/looking_time/babies/baby_analysis/data/exp3/jspsych"
jspsych_files <- list.files(jspsych_path)
jspsych_list <- lapply(jspsych_files %>% lapply(function(x) {paste(jspsych_path, x, sep='/')}), read.csv)

# grab subject numbers and expand
subject_num <- lapply(jspsych_files, function(x) {x %>% substring(6,7) %>% as.numeric()})
subject_num_expanded <- rep(subject_num, lapply(jspsych_list, function(x) {nrow(x)}))

jspsych_list <- lapply(jspsych_list, function(x) {x['success'] = NULL; x}) # remove success field because it caused merging issue
jspsych_df <- map_dfr(jspsych_list, ~ .x) %>% mutate(subject_num = subject_num_expanded)

trial_df <- jspsych_df %>%
  filter(stimulus_type == 'trial') %>% 
  select(subject, rt, stimulus_displayed, block_number, block_type, subject_num) %>%
  mutate(subject_num = as.numeric(subject_num),
         complexity = case_when(
           str_detect(stimulus_displayed, 'simple') ~ 'simple',
           str_detect(stimulus_displayed, 'complex') ~ 'complex'
         ),
         stimulus_num = case_when(
           complexity == 'simple' ~  str_match(stimulus_displayed, "simple_(.*?)_A.gif")[,2],
           complexity == 'complex' ~  str_match(stimulus_displayed, "complex_(.*?)_A.gif")[,2]
         ),
         stimulus_num = as.numeric(stimulus_num)
  ) %>%
  group_by(subject_num, block_number) %>% 
  dplyr::mutate(trial_num = 1:n(),
                valid = case_when(    
                  #mark blocks with uneven trial num or less than 4 (ended prematurely)  
                  n() %% 2 != 0 ~ FALSE, 
                  n() < 4 ~ FALSE,
                  TRUE ~ TRUE),
                fam_or_test = case_when( # last trial is test, rest if familiarization
                  trial_num < n() ~ 'fam',
                  trial_num == n() ~ 'test'
                ),
                fam_duration = max(trial_num) - 1, # how many fam trials in this block
                block_number = block_number + 1) %>% 
  filter(!(fam_or_test == 'fam' & trial_num < (n()-1))) %>% # remove fam trials except last, because this is the format of the looking data (one row for all fam trials)
  ungroup()

# complete missing blocks (for experiments that ended prematurely)
trial_df <- trial_df %>% complete(subject_num, nesting(block_number, fam_or_test)) %>%
  # make these trials invalid
  # add temp_id
  mutate(valid = case_when(
    is.na(valid) ~ FALSE,
    TRUE ~ valid)) %>%
  slice(rep(1:n(), each = 2))  %>% # duplicate for each coder
  dplyr::mutate(coder = rep_len(c(1,2), n()), 
                temp_id = paste0(subject_num, block_number, fam_or_test, coder)) %>%
  select(-c("coder"))


# exclusions
exclusions_df = read.csv('/Users/galraz1/Developer/looking_time/babies/baby-experiment-3/adaptive_sampling/exclusions.csv', sep = ',')

trial_df <- trial_df  %>% filter(valid)

for (x in 1:nrow(trial_df)){
  exclusion_info = exclusions_df[x,]
  print(exclusion_info$onwards)
  if (exclusion_info$onwards){
    trial_df <- trial_df %>% filter(
      # if onwards = T, then remove all trials starting from that trial onwards
      !(subject_num == exclusion_info$subject_number & block_number >= exclusion_info$trial_number)
    )
  }
  else { 
    trial_df <- trial_df %>% filter(
      # if onwards = F, then only remove trial of that number
      !(subject_num == exclusion_info$subject_number & block_number == exclusion_info$trial_number)
    )
  }
}


block_dist <- trial_df %>% 
  dplyr::group_by(block_number, block_type, fam_duration, complexity) %>% 
  dplyr::summarise(n_trial = n()) %>% ungroup() %>% droplevels() 

# expand to account for cases that didn't appear in the data at all  
expanded_df <- block_dist %>% expand(block_number, block_type, fam_duration, complexity) 

#join expanded with original
full_df <- block_dist %>% right_join(expanded_df) 

# replace nans with 0
full_df$n_trial[is.na(full_df$n_trial)] = 0 

# plot distribution
full_df %>% ggplot(aes(x=block_number, y=n_trial, group=block_type, color = block_type)) + geom_point(alpha=.8, position = position_dodge(width = .1))  + 
  geom_line() + facet_grid(complexity~fam_duration)


# initialize rotation
fam_durations = c(0,0,8,4,8,4)
block_types = c("Std", "Dev", "Dev", "Std", "Std", "Dev")

# conditions
counterbalancing_conditions = williams(6)

# preallocate all sds
all_sds = c()


# go through each possible permutation of allocation
for (i in 1:nrow(counterbalancing_conditions)) {
  
  # starting df
  hypothetical_df <- full_df
  
    # go through each block 
    for (j in 1:ncol(counterbalancing_conditions)) {
      
      # increment by one
      hypothetical_df$n_trial[
        hypothetical_df$fam_duration == fam_durations[counterbalancing_conditions[i,j]] & 
          hypothetical_df$block_type == block_types[counterbalancing_conditions[i,j]] & 
          hypothetical_df$block_number == j] <-
        hypothetical_df$n_trial[
          hypothetical_df$fam_duration == fam_durations[counterbalancing_conditions[i,j]] & 
            hypothetical_df$block_type == block_types[counterbalancing_conditions[i,j]] & 
            hypothetical_df$block_number == j] + 1
      
    }

# get stddev of std vs dev for each fam duration & block_number
cur_stdev <- hypothetical_df %>% 
  dplyr::group_by(fam_duration, block_number) %>%
  dplyr::mutate(stddev = sd(n_trial)) %>% 
  pull(stddev)

  all_sds <- append(all_sds, sum(cur_stdev))
  
}

best_condition <- which.min(all_sds)

print(best_condition)
