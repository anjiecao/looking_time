tidy_all_rt_task_data <- function(raw_data){
  
  curiosity_subject <- raw_data%>% 
    filter(stimulus_type == "curiousity") %>% 
    distinct(subject) %>% 
    pull()
  
  memory_subject <- raw_data %>% 
    filter(stimulus_type == "memory_test") %>% 
    distinct(subject) %>% 
    pull()
  
  math_subject <- raw_data %>% 
    filter(stimulus_type == "math_question") %>% 
    distinct(subject) %>% 
    pull()
  
  
  data_with_task_type <- raw_data %>% 
    mutate(task_type = case_when(
      subject %in% curiosity_subject ~ "curiosity", 
      subject %in% memory_subject ~ "memory", 
      subject %in% math_subject ~ "math"
    )) %>% left_join(
      raw_data %>% 
        filter(!is.na(block_number)) %>% 
        group_by(subject, block_number) %>%
        distinct(stimulus_displayed) %>% 
        summarise(n = n()) %>% 
        mutate(deviant_trial_type = if_else(n == 1, "no_deviant", "one_deviant")) %>% 
        select(subject, block_number, deviant_trial_type), 
      by = c("subject", "block_number")
    )
  
  
  curiosity_data <- data_with_task_type %>% 
    filter(task_type == "curiosity")
  
  curiosity_data_combined <- curiosity_data %>% 
    filter(stimulus_type == "trial") %>% 
    select(-c("responses", "question_stimuli")) %>% 
    left_join(curiosity_data %>% 
                select(-block_number) %>% 
                rename(block_number = block_index) %>% 
                filter(stimulus_type == "curiousity") %>% 
                select(subject, block_number, question_stimuli, responses), 
              by = c("subject", "block_number")) %>% 
    mutate(
      task_question_type = case_when(
        deviant_trial_type == "one_deviant" & question_stimuli == block_background ~ "curiosity_background", 
        deviant_trial_type == "one_deviant" & question_stimuli == block_deviant ~ "curiosity_deviant", 
        deviant_trial_type == "no_deviant" & question_stimuli == block_background ~ "curiosity_background", 
        TRUE ~ "curiosity_novel"
      ), 
      task_question_response = map(responses, ~ fromJSON(.) %>% as.data.frame()) %>% unlist()
    ) %>% 
    group_by(subject, block_number) %>% 
    mutate(trial_number = row_number()) %>% 
    select(subject, block_number, trial_number, block_type, task_type, block_background, block_deviant, deviant_trial_type,stimulus_displayed, trial_looking_time, task_question_type, task_question_response)
  
  
  memory_data <- data_with_task_type %>% 
    filter(task_type == "memory")
  
  memory_data_combined <- memory_data %>% 
    filter(stimulus_type == "trial") %>% 
    select(-c("responses", "question_stimuli")) %>% 
    left_join(memory_data %>% 
                select(-block_number) %>% 
                rename(block_number = block_index) %>% 
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
    select(subject, block_number, trial_number, block_type, task_type, block_background, block_deviant, deviant_trial_type, stimulus_displayed, trial_looking_time, task_question_type, task_question_response)
  
  math_data <- data_with_task_type %>% 
    filter(task_type == "math")
  
  math_data_combined <- math_data %>% 
    filter(stimulus_type == "trial") %>% 
    select(-c("responses", "question_stimuli")) %>% 
    left_join(math_data %>%
                filter(stimulus_type == "math_question") %>% 
                select(subject, block_number, responses, math_correct_answer) %>% 
                mutate(task_question_response_raw = map(responses, ~ fromJSON(.) %>% as.data.frame()) %>% unlist() %>% as.character(), 
                       task_question_response = case_when(
                         as.character(task_question_response_raw) == as.character(math_correct_answer) ~ TRUE, 
                         TRUE ~ FALSE 
                       )) %>% 
                group_by(subject) %>% 
                mutate(block_number = row_number()-1), 
              by = c("subject", "block_number")) %>% 
    mutate(
      task_question_type = "math"
    ) %>% 
    group_by(subject, block_number) %>% 
    mutate(trial_number = row_number()) %>% 
    select(subject, block_number, trial_number, block_type, task_type, block_background, block_deviant, deviant_trial_type,  stimulus_displayed, trial_looking_time, task_question_type, task_question_response)
  
  temp_all <- bind_rows(curiosity_data_combined, 
                        memory_data_combined, 
                        math_data_combined) %>% 
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
    mutate(block_number = block_number + 1) %>% 
    select(subject, block_number, block_type, task_type, deviant_position, trial_number, trial_type, trial_looking_time, stimulus_displayed, task_question_type, task_question_response )
  
  
  return (cleaned_df)
  
  
  
}
