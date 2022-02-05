
import os
import pandas as pd
import numpy as np
import seaborn as sns

# IN R


# jspsych files
jspsych_path = "/data/exp2/jspsych"
jspsych_files = os.listdir(jspsych_path)
#
# # grab subject and session numbers
# subject_num <- lapply(jspsych_files, function(x) {x %>% substring(6,7) %>% as.numeric()})
# session_num <- lapply(jspsych_files, function(x) {x %>% substring(9,9) %>% as.numeric()})
#
# # convert jspsych files to big dataframe
# jspsych_list <- lapply(jspsych_files %>% lapply(function(x) {paste(jspsych_path, x, sep='/')}), read.csv)
#
# # expand subject and session num to concatenate
# subject_num_expanded <- rep(subject_num, lapply(jspsych_list, function(x) {nrow(x)}))
# session_num_expanded <- rep(session_num, lapply(jspsych_list, function(x) {nrow(x)}))
#
# jspsych_list <- lapply(jspsych_list, function(x) {x['success'] = NULL; x}) # remove success field because it caused merging issue
# jspsych_df <- map_dfr(jspsych_list, ~ .x) %>% mutate(subject_num = subject_num_expanded, session_num = as.character(session_num_expanded))
#
#
# trial_df <- jspsych_df %>%
#   filter(stimulus_type == 'trial') %>%
#   select(subject, stimulus_displayed, block_number, block_type, subject_num, session_num) %>%
#   mutate(complexity = case_when(
#                        str_detect(stimulus_displayed, 'simple') ~ 'simple',
#                        str_detect(stimulus_displayed, 'complex') ~ 'complex'
#                      ),
#          stimulus_num = case_when(
#            complexity == 'simple' ~  str_match(stimulus_displayed, "simple_(.*?)_A.gif")[,2],
#            complexity == 'complex' ~  str_match(stimulus_displayed, "complex_(.*?)_A.gif")[,2]
#          ),
#          stimulus_num = as.numeric(stimulus_num)
#          ) %>%
#   group_by(subject_num, session_num, block_number) %>%
#   dplyr::mutate(trial_num = 1:n(),
#                 valid = case_when(
#                 #mark blocks with uneven trial num or less than 4 (ended prematurely)
#                 n() %% 2 != 0 ~ FALSE,
#                 n() < 4 ~ FALSE,
#                 TRUE ~ TRUE),
#                 fam_or_test = case_when( # last trial is test, rest if familiarization
#                 trial_num < n() ~ 'fam',
#                 trial_num == n() ~ 'test'
#         ),
#         fam_duration = max(trial_num) - 1, # how many fam trials in this block
#         block_number = block_number + 1) %>%
#   filter(!(fam_or_test == 'fam'))


# GET EXCLUSIONS FROM CSV

exclusions = pd.read_csv('exclusions.csv')

print(best_condition)