library(reshape2)
library(tidyverse)
s_a1b5 <- readRDS(here("adult_modeling/obs_1_a1b5_sequential_update.rds"))

kl_s_a1b5 <- readRDS(here("adult_modeling/obs_1_a1b5_sequential_update_kl.rds"))

obs_1 <-  readRDS(here("adult_modeling/m_res/obs_1"))

# plan:
#- add columns: entropy, kl divergence, alternative entropy, alternative kl divergence

## adding on KL 
unique_theta <- s_a1b5 %>% 
  select(theta) %>% 
  distinct()

df_kl <- kl_s_a1b5 %>% 
  crossing(unique_theta) %>% 
  arrange(update_step, feature_index) %>% 
  mutate(temp_id = paste0(update_step,sep = "_", feature_index )) %>% 
  select(kl, temp_id)


df_updated <- s_a1b5 %>% 
  mutate(temp_id = paste0(update_number, sep = "_", feature_index)) %>% 
  left_join(df_kl, by = "temp_id")
 
## adding on alternative KL 

grid_theta <- seq(0.1, 1, 0.2)
grid_epsilon <- seq(0.1, 1, 0.2)
alpha_prior = 5
beta_prior = 1
alpha_epsilon = 1 
beta_epsilon = 10

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



#- add epsilon column



#- calculate posterior predictive distribution:
#     - compute p(z|theta, epsilon) --> will give P(z_ij=0) and P(z_ij=1)
#- get EIG with entropy:  
# if true z = 1: P(z_ij=0) * (previous - alternative entropy) + P(z_ij=1) * (previous - entropy)
# else if z = 0: P(z_ij=0) * (previous - entropy) + P(z_ij=1) * (previous - alternative entropy)
# - get EIG with KL:
# if true z = 1: P(z_ij=0) * KL(previous dist||alternative dist) + P(z_ij=1) * KL(previous dist||current dist)
# else if z = 0: P(z_ij=0) * KL(previous dist||current dist) + P(z_ij=1) * KL(previous dist||alternative dist)