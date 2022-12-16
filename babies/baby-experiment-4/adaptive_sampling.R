library(tidyverse)
library(Rmisc)
library(dplyr)
library(here)
library(readxl)
library(janitor)
library(nlme)
library(sjmisc)
library(DescTools)
library(crossdes)
library(stringr)


# jspsych files
jspsych_path <- "/Users/galraz1/Developer/looking_time/babies/baby-experiment-4/data/exp4"
jspsych_files <- list.files(jspsych_path) 
jspsych_files <- jspsych_files[jspsych_files != 'exclusions'] # remote exclusions folder from list
jspsych_list <- lapply(jspsych_files %>% lapply(function(x) {paste(jspsych_path, x, sep='/')}), read.csv)

# grab subject numbers and expand
subject_num <- lapply(jspsych_files, function(x) {x %>% substring(6,7) %>% as.numeric()})
subject_num_expanded <- rep(subject_num, lapply(jspsych_list, function(x) {nrow(x)}))

jspsych_list <- lapply(jspsych_list, function(x) {x['success'] = NULL; x}) # remove success field because it caused merging issue
jspsych_df <- map_dfr(jspsych_list, ~ .x) %>% mutate(subject_num = subject_num_expanded)

trial_df <- jspsych_df %>%
  filter(stimulus_type == 'trial') %>% 
  select(subject, rt, stimulus_displayed, block_number, block_type, subject_num, fam_duration) %>%
  mutate(subject_num = as.numeric(subject_num)) %>%
  group_by(subject_num, block_number) %>% 
  dplyr::mutate(fam_duration = fam_duration, # how many fam trials in this block
                block_number = block_number) %>%
  ungroup()

# exclusions
exclusions_df = read.csv('/Users/galraz1/Developer/looking_time/babies/baby-experiment-4/data/exp4/exclusions/exclusions.csv')
exclusions_df = exclusions_df %>% filter(!is.na(onwards))
# drop na from exclusions

for (x in 1:nrow(exclusions_df)){
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
  dplyr::group_by(block_number, block_type, fam_duration) %>% 
  dplyr::summarise(n_trial = n()) %>% ungroup() %>% droplevels() 

# expand to account for cases that didn't appear in the data at all  
expanded_df <- block_dist %>% tidyr::expand(block_number, block_type, fam_duration) 

#join expanded with original
full_df <- block_dist %>% right_join(expanded_df) 

# replace nans with 0
full_df$n_trial[is.na(full_df$n_trial)] = 0 

# plot distribution
full_df %>% ggplot(aes(x=block_number, y=n_trial, group=block_type, color = block_type)) + geom_point(alpha=.8, position = position_dodge(width = .1))  + 
  geom_line() + facet_grid(block_type~fam_duration)


# initialize rotation
fam_durations = c(1,1,3,9,3,9)
block_types = c("background", "deviant", "deviant", "background", "background", "deviant")

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

  # get stddev of n trial
  cur_stdev <- sd(hypothetical_df$n_trial)

  all_sds <- append(all_sds, cur_stdev)
  
}

best_condition <- which.min(all_sds)

print(best_condition)
