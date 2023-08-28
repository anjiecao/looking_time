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
jspsych_path <- "/Users/galraz/Developer/looking_time/babies/baby-experiment-7/data"
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
  select(subject, rt, stimulus_displayed, block_number, subject_num, violation_type, species) %>%
  mutate(subject_num = as.numeric(subject_num))


# exclusions
exclusions_df = read.csv('/Users/galraz/Developer/looking_time/babies/baby-experiment-7/data/exclusions/exclusions.csv')
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
  dplyr::group_by(block_number, violation_type) %>% 
  dplyr::summarise(n_trial = n()) %>% ungroup() %>% droplevels() 

# check if any violation types are missing and add
existing_violation_types = block_dist$violation_type %>% unique()

all_violation_types = c('background', 'animacy', 'identity', 'pose', 'number')
missing_violation_type = setdiff(all_violation_types,existing_violation_types)
missing_row = tibble(violation_type = missing_violation_type, block_number = 1, n_trial = 0)

block_dist = rbind(block_dist,missing_row)

# expand to account for cases that didn't appear in the data at all  
expanded_df <- block_dist %>% tidyr::expand(block_number, violation_type) 

#join expanded with original
full_df <- block_dist %>% right_join(expanded_df) 

# replace nans with 0
full_df$n_trial[is.na(full_df$n_trial)] = 0 


# initialize rotation

block_types = all_violation_types

# if no valid trials, generate full_df here
if (nrow(trial_df) == 0) {
  full_df = expand_grid(block_type = all_violation_types, block_number = 1:4) %>% mutate(n_trial = 0)
}


# load possible permutations that have 1 background trial + 3 of the other trials
orders = read_csv('/Users/galraz/Developer/looking_time/babies/baby-experiment-7/orders.csv')

# initiallize sd's
all_sds = c()

# go through each possible permutation of allocation
for (i in 1:nrow(orders)) {
  
  # starting df
  hypothetical_df <- full_df
  
    # go through each block 
    for (j in 1:ncol(orders)) {
      
      # increment by one
      hypothetical_df$n_trial[
          hypothetical_df$violation_type == as.character(orders[i,j]) & 
          hypothetical_df$block_number == j] <-
        hypothetical_df$n_trial[
          hypothetical_df$violation_type == as.character(orders[i,j]) & 
            hypothetical_df$block_number == j] + 1
      
    }

  # get stddev of n trial
  cur_stdev <- sd(hypothetical_df$n_trial)

  all_sds <- append(all_sds, cur_stdev)
  
}

best_condition <- which.min(all_sds)

orders[best_condition,1]

print(paste("['",as.character(orders[best_condition,1]), "','",as.character(orders[best_condition,2]), "','",as.character(orders[best_condition,3]), "','",as.character(orders[best_condition,4]),"']", sep=""))
