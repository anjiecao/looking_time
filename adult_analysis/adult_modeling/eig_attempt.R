library(reshape2)
library(tidyverse)

## source relevant files



# read 
s_a1b5 <- readRDS(here("adult_modeling/obs_1_a1b5_sequential_update.rds"))
kl_s_a1b5 <- readRDS(here("adult_modeling/obs_1_a1b5_sequential_update_kl.rds"))
obs_1 <-  readRDS(here("adult_modeling/m_res/obs_1"))

# plan:
#- add columns: entropy, kl divergence, alternative entropy, alternative kl divergence

# i dont think we actuallt need this (see below, i think this works without these)
##crossing(unique_theta) %>% 
##  arrange(update_step, feature_index) %>% 

## adding on KL 
unique_theta <- s_a1b5 %>% 
  select(theta) %>% 
  distinct()

df_kl <- kl_s_a1b5 %>% 
  mutate(temp_id = paste0(update_step,sep = "_", feature_index,sep = "_", trial_num)) %>% 
  select(kl, temp_id)


df_updated <- s_a1b5 %>% 
  mutate(temp_id = paste0(update_number, sep = "_", feature_index,sep = "_", trial_num)) %>% 
  left_join(df_kl, by = "temp_id") 
 

grid_theta <- seq(0.1, 1, 0.2)
grid_epsilon <- seq(0.1, 1, 0.2)
alpha_prior = 5
beta_prior = 1
alpha_epsilon = 1 
beta_epsilon = 10

## adding on entropy


## adding on alternative (log)posterior 

alternative_observation <- get_flipped_observation(obs_1)

alternative_df <- update_alternative_posterior_distribution(grid_theta, 
                                                            grid_epsilon, 
                                                            obs_1, 
                                                            alternative_observation, 
                                                            alpha_prior, 
                                                            beta_prior, 
                                                            alpha_epsilon, 
                                                            beta_epsilon 
                                                            )

df <- alternative_df %>% 
  rename(alternative_posterior = posterior, alternative_log_posterior = log_posterior) %>%
  left_join(df_updated) # this does a natural join i.e. using al lvariables common across alternative_df and df_updated


# add alternative KL


# add alternative entropy



#- add epsilon column

#- calculate posterior predictive distribution:
#     - compute p(z|theta, epsilon) --> will give P(z_ij=0) and P(z_ij=1)
#- get EIG with entropy:  
# if true z = 1: P(z_ij=0) * (previous - alternative entropy) + P(z_ij=1) * (previous - entropy)
# else if z = 0: P(z_ij=0) * (previous - entropy) + P(z_ij=1) * (previous - alternative entropy)
# - get EIG with KL:
# if true z = 1: P(z_ij=0) * KL(previous dist||alternative dist) + P(z_ij=1) * KL(previous dist||current dist)
# else if z = 0: P(z_ij=0) * KL(previous dist||current dist) + P(z_ij=1) * KL(previous dist||alternative dist)



# some relevant functions
get_flipped_observation <- function(original_observation){
  
  flip_observation <- original_observation %>% 
    select(-c(trial_num, trial_observation_num)) %>% 
    map_df(., function(x){if_else(x == 1, 0, 1) })
  
  flip_observation$trial_num <- original_observation$trial_num
  flip_observation$trial_observation_num <- original_observation$trial_observation_num
  return (flip_observation)
  
}