poli_model_pokebaby <- function (seq){
  
  n <- length(seq)
  model <- tibble(trials = 0:length(seq), 
                  bin1 = 0, 
                  bin2 = 0, 
                  bin3 = 0)
  
  prior <- c(1,1,1)
  model[1,2:4] <- as.list(prior)
  
  # updating prior 
  for (i in 1:length(seq)) {
    model[model$trials == i, 2:4] <- model[model$trials == i-1, 2:4]
    model[model$trials == i, seq[i]+1] <- 
      model[model$trials == i-1, seq[i]+1] + 1
  }
  
  # calculating probability 
  model %<>%
    rowwise() %>%
    mutate(total = sum(bin1 + bin2 + bin3),
           p1 = bin1 / total,
           p2 = bin2 / total,
           p3 = bin3 / total)
  
  model$observed <- c(NA, seq)
  
  # calculating surprisal 
  model$surprisal <- NA_real_
  for (i in 1:length(seq)){
    curr_bin = seq[i]
    curr_bin_column = paste0("p", curr_bin)
    prev_probabiliy = model %>%
      filter(trials == i-1) %>% 
      select(curr_bin_column) %>% 
      pull()
    
    curr_suprirsal = -log2(prev_probabiliy)
    
    model[model$trials == i, ]$surprisal <- curr_suprirsal
  }
  
  # calculating predictability
  model$predictability <- NA_real_
  for (i in 1:(n+1)){
    current_trial_predict = model %>% 
      filter(trials == i) %>% 
      select(p1,p2,p3) %>% 
      pivot_longer(p1:p3, names_to = "prob") %>% 
      mutate(log2_value = log2(value), 
             product = value * log2_value) %>% 
      summarise(sum(product)) %>% 
      pull()
    
    model[model$trials == i, ]$predictability <- current_trial_predict
  }
  
  # calculating learning progress
  model$learning_progress <- NA_real_
  for (i in 1:(n+1)){
    
    #i = 1 
    
    previous_trial_prob <- model %>% 
      filter(trials == i-1) %>% 
      select(p1:p3) %>% 
      rename(bin1 = p1, bin2 = p2, bin3 = p3) %>% 
      pivot_longer(bin1:bin3, names_to = "bin", values_to = "prev_prob")
    
    
    
    current_trial_prob <- model %>% 
      filter(trials == i) %>% 
      select(p1:p3) %>% 
      rename(bin1 = p1, bin2 = p2, bin3 = p3) %>% 
      pivot_longer(bin1:bin3, names_to = "bin", values_to = "curr_prob")
    
    trial_bin = left_join(previous_trial_prob, 
                          current_trial_prob, 
                          by = "bin")
    
    d_bin = trial_bin %>% 
      mutate(d_bin = curr_prob * log2(curr_prob/prev_prob)) %>% 
      summarise(sum(d_bin)) %>% 
      pull()
    
    
    model[model$trials == i, ]$learning_progress <- d_bin
    
  }
  
  return(model)
  
}


poli_model_plot <- function(model){
  df.plot <- model %>% 
    select(trials, surprisal, predictability, learning_progress) %>% 
    pivot_longer(cols = c("surprisal", "predictability", "learning_progress"), 
                 names_to = "measure", 
                 values_to = "value") %>% 
    filter(trials != 0)
  
  surprise_plot <- df.plot %>% 
    filter(measure == "surprisal") %>% 
    ggplot(aes(x = trials, y = value)) + 
    geom_point() + 
    geom_line() + 
    ylab("surprise") #+ 
    #scale_x_continuous(breaks =seq(1,12,1))
  
  predictability_plot <- df.plot %>% 
    filter(measure == "predictability") %>% 
    ggplot(aes(x = trials, y = value)) + 
    geom_point() + 
    geom_line() + 
    ylab("predictability") #+ 
    #scale_x_continuous(breaks =seq(1,12,1))
  
  learning_progress_plot <- df.plot %>% 
    filter(measure == "learning_progress") %>% 
    ggplot(aes(x = trials, y = value)) + 
    geom_point() + 
    geom_line() + 
    ylab("learning_progress") #+ 
    #scale_x_continuous(breaks =seq(1,12,1))
  
    surprise_plot+predictability_plot+learning_progress_plot + plot_layout(ncol = 1)
  
  
}
