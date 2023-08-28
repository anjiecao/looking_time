library(tidyverse)
library(Rmisc)
library(dplyr)
library(here)
library(readxl)
library(janitor)
library(sjmisc)
library(DescTools)
library(crossdes)
library(stringr)


# jspsych files
jspsych_path <- "/Users/galraz/Developer/looking_time/babies/baby-experiment-6/data"
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
  select(subject, rt, stimulus_displayed, block_number, subject_num) %>%
  mutate(subject_num = as.numeric(subject_num)) %>%
  mutate(block_type = case_when(str_detect(stimulus_displayed, 'veggie') ~ 'veggie', 
                                str_detect(stimulus_displayed, 'animate') ~ 
                                  ifelse(str_detect(stimulus_displayed, 'single'), 'single_animal', 'pair_animal')))

# exclusions
exclusions_df = read.csv('/Users/galraz/Developer/looking_time/babies/baby-experiment-6/data/exclusions/exclusions.csv')
exclusions_df = exclusions_df %>% filter(!is.na(onwards))

# if no exclusions, skip this
if (nrow(exclusions_df) > 0) {
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
}

block_dist <- trial_df %>% 
  dplyr::group_by(block_number, block_type) %>% 
  dplyr::summarise(n_trial = n()) %>% ungroup() %>% droplevels() 

# expand to account for cases that didn't appear in the data at all  
expanded_df <- block_dist %>% tidyr::expand(block_number, block_type) 

#join expanded with original
full_df <- block_dist %>% right_join(expanded_df) 

# replace nans with 0
full_df$n_trial[is.na(full_df$n_trial)] = 0 

# plot distribution
full_df %>% ggplot(aes(x=block_number, y=n_trial, group=block_type, color = block_type)) + geom_point(alpha=.8, position = position_dodge(width = .1))  + 
  geom_line() + facet_grid(~block_type) + theme_grey(base_size = 20)


# initialize rotation

block_types = c("veggie", "single_animal", "pair_animal")

# if no valid trials, generate full_df here
if (nrow(trial_df) == 0) {
  full_df = expand_grid(fam_duration = fam_durations, block_type = block_types, block_number = 1:6) %>% mutate(n_trial = 0)
}

# conditions
counterbalancing_conditions = williams(6)

# preallocate all sds
all_sds = c()

block_trials <- c('single_animal', 'veggie', 'pair_animal', 'single_animal', 'pair_animal', 'veggie')

# go through each possible permutation of allocation
for (i in 1:nrow(counterbalancing_conditions)) {
  
  # starting df
  hypothetical_df <- full_df
  
    # go through each block 
    for (j in 1:ncol(counterbalancing_conditions)) {
      
      # increment by one
      hypothetical_df$n_trial[
          hypothetical_df$block_type == block_trials[counterbalancing_conditions[i,j]] & 
          hypothetical_df$block_number == j] <-
        hypothetical_df$n_trial[
            hypothetical_df$block_type == block_trials[counterbalancing_conditions[i,j]] & 
            hypothetical_df$block_number == j] + 1
      
    }

  # get stddev of n trial
  cur_stdev <- sd(hypothetical_df$n_trial)

  all_sds <- append(all_sds, cur_stdev)
  
}

best_condition <- which.min(all_sds)

print(best_condition)
