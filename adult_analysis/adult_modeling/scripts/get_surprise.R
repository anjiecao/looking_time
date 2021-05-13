get_surprise_for_feature_updates <- function(feature_i, updates_df){
  
  feature_df <- updates_df %>% 
    filter(feature_index == feature_i)
  
  thetas <- feature_df %>% 
    distinct(theta) %>% 
    pull()
  
  all_updates <- feature_df %>% 
    distinct(update_number) %>% 
    pull()
  
  
  # FIXME: currently not including the prior's surprise(?)
  all_surprise <- c()
  
  for (i in all_updates){
    
    current_lps <- feature_df %>% 
      filter(update_number == i) %>% 
      pull(log_posterior) 
    
    current_s <-weighted.mean(x = -current_lps, w = exp(current_lps)) 
    all_surprise <- c(all_surprise, current_s)
    
  }
  
  surprise_df <- tibble(surprise = all_surprise, 
                        update_number = seq(1, length(all_surprise), 1)) %>% 
    mutate(feature_index = feature_i)
  
  return(surprise_df)
  
}


get_surprise_for_creature_updates <- function(updates_df){
  
  all_features <- updates_df %>% 
    distinct(feature_index) %>% 
    pull()
  
  lapply(all_features, function(x){
    get_surprise_for_feature_updates(x, updates_df)
  }) %>% 
    bind_rows()
  
  
}