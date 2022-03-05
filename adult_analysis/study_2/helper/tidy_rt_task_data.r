get_block_background <- function(df,block_n,  subject_number){
  df %>% 
    filter(subject == subject_number, block_number == block_n) %>% 
    select(block_background) %>% 
    pull() %>% 
    unique()
}

get_block_deviant <- function(df,block_n,  subject_number){
  df %>% 
    filter(subject == subject_number, block_number == block_n) %>% 
    select(block_deviant) %>% 
    pull() %>% 
    unique()
}


get_block_type <- function(df,block_n,  subject_number){
  df %>% 
    filter(subject == subject_number, block_number == block_n) %>% 
    select(block_type) %>% 
    pull() %>% 
    unique()
}

tidy_all_rt_task_data <- function(raw_data){
  
  
  memory_subject <- raw_data %>% 
    filter(stimulus_type == "memory_test") %>% 
    distinct(subject) %>% 
    pull()
  
  math_subject <- raw_data %>% 
    filter(stimulus_type == "math_question") %>% 
    distinct(subject) %>% 
    pull()
  
  
  data_with_task_type <- raw_data %>% 
    mutate(task_type =  "memory") %>% left_join(
      raw_data %>% 
        filter(!is.na(block_number)) %>% 
        group_by(subject, block_number) %>%
        distinct(stimulus_displayed) %>% 
        summarise(n = n()) %>% 
        mutate(deviant_trial_type = if_else(n == 1, "no_deviant", "one_deviant")) %>% 
        select(subject, block_number, deviant_trial_type), 
      by = c("subject", "block_number")
    )
  
  
 
  
  memory_data <- data_with_task_type %>% 
    filter(task_type == "memory")
  
  memory_data_raw <- memory_data %>% 
    filter(stimulus_type == "trial" | trial_looking_time == 500 | trial_looking_time == 10000)%>% 
    select(-c("responses", "question_stimuli")) 
  
  # some messup from upstream that causes the trial not logged properly, but no big deal
  

  
  #  isolate the second trial 
  second_trials <- memory_data_raw %>% 
    filter(!is.na(stimulus_displayed)) %>% 
    group_by(subject, block_number) %>% 
    mutate(
      block_number = block_number + 1
    ) %>% 
    ungroup() %>% 
    filter(exposure_type == "forced") 
  
  #all other trials 
  all_other_trials <- memory_data_raw %>% 
    filter(!is.na(stimulus_displayed)) %>% 
    group_by(subject, block_number) %>% 
    mutate(
      block_number = block_number + 1
    ) %>% 
    ungroup() %>% 
    filter(exposure_type == "self-paced") %>% 
    group_by(subject, block_number) %>% 
    mutate(trial_number = row_number() + 2)


  # put all the self-paced trial together 
  all_self_paced <- second_trial %>% 
    rowwise() %>% 
    mutate(block_background = get_block_background(all_other_trials, block_number, subject), 
           block_deviant = get_block_deviant(all_other_trials, block_number, subject), 
           exposure_type = "self-paced", 
           trial_number = 2) %>% 
    bind_rows(all_other_trials) %>% 
    group_by(subject, block_number) %>% 
    arrange(subject, block_number, trial_number)
  
  #  recover all the real forced trial 
  all_forced_trials <- memory_data_raw %>%
    filter(is.na(stimulus_displayed) & forced_exposure_time %in% c(500, 10000)) %>% 
    filter(exposure_type == "forced") %>% 
    group_by(subject) %>% 
    mutate(
      block_number = row_number()
    ) %>% 
    ungroup() %>% 
    rowwise() %>% 
    mutate(block_background = get_block_background(all_other_trials, block_number, subject), 
           block_deviant = get_block_deviant(all_other_trials, block_number, subject), 
           block_type = get_block_type(all_other_trials, block_number, subject),
           exposure_type = "forced", 
           trial_number = 1, 
           stimulus_displayed = block_background, 
           trial_looking_time = forced_exposure_time) 
  

  all_trials <- bind_rows(all_self_paced, all_forced_trials) %>% 
    group_by(subject, block_number) %>% 
    arrange(subject, block_number, trial_number)
  
  
  memory_data_combined <- all_trials %>% 
    left_join(memory_data %>% 
                select(-block_number) %>% 
                mutate(block_number = block_index + 1) %>% 
                filter(stimulus_type == "memory_test") %>% 
                select(subject, block_number, question_stimuli, responses), 
              by = c("subject", "block_number")) %>% 
    mutate(
      task_question_type = case_when(
        deviant_trial_type == "one_deviant" & question_stimuli == block_background ~ "memory_background", 
        deviant_trial_type == "one_deviant" & question_stimuli == block_deviant ~ "memory_deviant", 
        deviant_trial_type == "no_deviant" & question_stimuli == block_background ~ "memory_background", 
        TRUE ~ "memory_novel"
      ), 

      task_question_response_raw = map(responses, ~ fromJSON(.) %>% as.data.frame()) %>% unlist(), 
      task_question_response = case_when(
        task_question_response_raw == "Yes" & task_question_type == "memory_background" ~ TRUE, 
        task_question_response_raw == "Yes" & task_question_type == "memory_deviant" ~ TRUE,
        task_question_response_raw == "No" & task_question_type == "memory_novel" ~ TRUE, 
        TRUE ~ FALSE
      )
    ) %>% 
    group_by(subject, block_number) %>% 
    mutate(trial_number = row_number()) %>% 
    select(subject, block_number, trial_number, block_type, forced_exposure_time, task_type, block_background, block_deviant, deviant_trial_type, stimulus_displayed, trial_looking_time, task_question_type, task_question_response)
  
 
  temp_all <- memory_data_combined %>% 
    ungroup() %>% 
    mutate(trial_type = case_when(
     stimulus_displayed == block_background ~ "background", 
    stimulus_displayed == block_deviant ~ "deviant"
    ))
  
  cleaned_df <- temp_all %>% 
    left_join(
      temp_all %>% 
        filter(trial_type == "deviant") %>% 
        mutate(deviant_position = trial_number) %>% 
        select(subject, block_number, deviant_position), 
      by = c("subject", "block_number")
    ) %>% 
    select(subject, block_number, block_type,forced_exposure_time, task_type, deviant_position, trial_number, trial_type, trial_looking_time, stimulus_displayed, task_question_type, task_question_response )
  
  
  return (cleaned_df)
  
  
  
}
