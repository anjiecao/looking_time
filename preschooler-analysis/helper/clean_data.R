tidy_all_rt_task_data <- function(raw_data){
  
  
  cleaned_rt_data <- raw_data %>% 
    filter(stimulus_type == "trial") %>% 
    group_by(subject, block_number) %>% 
    mutate(trial_number = row_number(), 
           block_number = block_number + 1) %>% 
    mutate(trial_type = case_when(
      stimulus_displayed == block_background ~ "background", 
      stimulus_displayed == block_deviant ~ "deviant"
    )) 
  
  
  cleaned_rt_data <- cleaned_rt_data%>%
    left_join(
      cleaned_rt_data %>% 
        filter(trial_type == "deviant") %>% 
        mutate(deviant_position = trial_number) %>% 
        select(subject, block_number, deviant_position), 
      by = c("subject", "block_number")
    ) %>% 
    select(bing_id, child_age_group, block_number, trial_number, block_type, trial_type, block_background, block_deviant, deviant_position,stimulus_displayed, trial_looking_time) %>% 
    ungroup()
  
  
  
  
  return (cleaned_rt_data)
  
  
  
}