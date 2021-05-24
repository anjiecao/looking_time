library(reshape2)

s_a1b5 <- readRDS(here("adult_modeling/obs_1_a1b5_sequential_update.rds"))


# plan:
#- add epsilon column
#- add columns: entropy, kl divergence, alternative entropy, alternative kl divergence
#- calculate posterior predictive distribution:
#     - compute p(z|theta, epsilon) --> will give P(z_ij=0) and P(z_ij=1)
#- get EIG with entropy:  
# if true z = 1: P(z_ij=0) * (previous - alternative entropy) + P(z_ij=1) * (previous - entropy)
# else if z = 0: P(z_ij=0) * (previous - entropy) + P(z_ij=1) * (previous - alternative entropy)
# - get EIG with KL:
# if true z = 1: P(z_ij=0) * KL(previous dist||alternative dist) + P(z_ij=1) * KL(previous dist||current dist)
# else if z = 0: P(z_ij=0) * KL(previous dist||current dist) + P(z_ij=1) * KL(previous dist||alternative dist)