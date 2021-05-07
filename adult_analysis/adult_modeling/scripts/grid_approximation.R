grid_approximate_creature_with_theta_initial <- function(
  grid_theta = seq(0.01, .99, .01), 
  grid_epsilon = seq(0.01, .99, .01), 
  noisy_creature_observation, 
  alpha_prior = 1, 
  beta_prior = 1,
  alpha_epsilon, 
  beta_epsilon
){
  # special case this is for when only update based on 1 observation
  if(!is.matrix(noisy_creature_observation)){
    feature_number = length(noisy_creature_observation)
    
    lapply(seq(1, feature_number, 1), 
           function(x){
             first_update_grid_approximate_with_theta(
               feature_index = x, 
               thetas = grid_theta, 
               z_bar = noisy_creature_observation[x], 
               epsilon = epsilon, 
               alpha_theta = alpha_prior, 
               beta_theta = beta_prior,
               alpha_epsilon = alpha_epsilon, 
               beta_epsilon = beta_epsilon
             )
           }
    ) %>% 
      bind_rows()
  }else{
    feature_number = ncol(noisy_creature_observation)
    
    lapply(seq(1, feature_number, 1), 
           function(x){
             first_update_grid_approximate_with_theta(
               feature_index = x, 
               thetas = grid_theta, 
               z_bar = noisy_creature_observation[,x], 
               epsilon = epsilon, 
               alpha_theta = alpha_prior, 
               beta_theta = beta_prior,
               alpha_epsilon = alpha_epsilon, 
               beta_epsilon = beta_epsilon
             )
           }
    ) %>% 
      bind_rows()
  }
  
  
  
  
  

}

grid_approximate_creature_with_theta_and_epsilon_initial <- function(
  grid_theta = seq(0.01, .99, .01), 
  grid_epsilon = seq(0.01, .99, .01), 
  noisy_creature_observation, 
  alpha_prior = 1, 
  beta_prior = 1,
  alpha_epsilon, 
  beta_epsilon
){
  # special case this is for when only update based on 1 observation
  
  if(!is.matrix(noisy_creature_observation)){
    feature_number = length(noisy_creature_observation)
    
    lapply(seq(1, feature_number, 1), 
           function(x){
             first_update_grid_approximate_with_theta_and_epsilon(
               feature_index = x, 
               grid_theta = grid_theta, 
               grid_epsilon = grid_epsilon, 
               z_bar = noisy_creature_observation[x], 
               alpha_theta = alpha_prior, 
               beta_theta = beta_prior,
               alpha_epsilon = alpha_epsilon, 
               beta_epsilon = beta_epsilon
             )
           }
    ) %>% 
      bind_rows()
    
    
    
  }else{
    feature_number = ncol(noisy_creature_observation)
    
    lapply(seq(1, feature_number, 1), 
           function(x){
             first_update_grid_approximate_with_theta_and_epsilon(
               feature_index = x, 
               grid_theta = grid_theta, 
               grid_epsilon = grid_epsilon, 
               z_bar = noisy_creature_observation[,x], 
               alpha_theta = alpha_prior, 
               beta_theta = beta_prior,
               alpha_epsilon = alpha_epsilon, 
               beta_epsilon = beta_epsilon
             )
           }
    ) %>% 
      bind_rows()
  }

  
  
  
  
}


grid_approximate_creature_with_theta_continuous <- function(
  grid_theta = seq(0.01, .99, .01), 
  grid_epsilon = seq(0.01, .99, .01), 
  noisy_creature_observation, 
  updated_posterior_df,
  alpha_epsilon, 
  beta_epsilon
){
  
  feature_number = ncol(noisy_creature_observation)
  
  
  lapply(seq(1, feature_number, 1), 
         function(x){
           grid_approximation_with_theta(
             feature_index = x, 
             grid_theta = grid_theta, 
             z_bar = noisy_creature_observation[,x], 
             estimated_posterior_df = filter(updated_posterior_df, feature_index == x),
             alpha_epsilon = alpha_epsilon, 
             beta_epsilon = beta_epsilon
           )
         }
  ) %>% 
    bind_rows()
  
  
  
}

grid_approximate_creature_with_theta_and_epsilon_continuous <- function(
  grid_theta = seq(0.01, .99, .01), 
  grid_epsilon = seq(0.01, .99, .01), 
  noisy_creature_observation, 
  updated_posterior_df,
  alpha_epsilon, 
  beta_epsilon
){
  
  feature_number = ncol(noisy_creature_observation)
  
  lapply(seq(1, feature_number, 1), 
         function(x){
           grid_approximation_with_theta_and_epsilon(
             feature_index = x, 
             grid_theta = grid_theta, 
             grid_epsilon = grid_epsilon, 
             z_bar = noisy_creature_observation[,x], 
             estimated_posterior_df = filter(updated_posterior_df, feature_index == x),
             alpha_epsilon = alpha_epsilon, 
             beta_epsilon = beta_epsilon
           )
         }
  ) %>% 
    bind_rows()
  
  
}







# single feature 
## for trial 2 and beyond 
grid_approximation_with_theta <- function(
  feature_index = 1, 
  grid_theta = seq(0.01, .99, .01), 
  z_bar, 
  estimated_posterior_df, 
  alpha_epsilon = alpha_epsilon, 
  beta_epsilon = beta_epsilon){
  
  
  
  samps <- tibble("theta" = grid_theta) 
  
  
  samps$unnormalized_log_posterior <- mapply(function(x) update_lp_theta_given_z_after_observation(new_observation = z_bar, 
                                                                                                      theta = x, 
                                                                                                      epsilon = epsilon, 
                                                                                                      updated_posterior = estimated_posterior_df,
                                                                                                      alpha_epsilon = alpha_epsilon, 
                                                                                                      beta_epsilon = beta_epsilon), 
                                              samps$theta)
  
  
  samps$normalized_log_posterior <- samps$unnormalized_log_posterior - matrixStats::logSumExp(samps$unnormalized_log_posterior)
  samps$feature_index <- feature_index
  
  return(samps)
  
  
}


## single feature 
## grid approximation with theta and epsilon 
grid_approximation_with_theta_and_epsilon <- function(
  feature_index, 
  grid_theta = seq(0.01, .99, .01), 
  grid_epsilon = seq(0.01, .99, .01), 
  z_bar, 
  estimated_posterior_df, 
  alpha_epsilon = alpha_epsilon, 
  beta_epsilon = beta_epsilon){
  
  
  
  samps <- expand_grid(theta = grid_theta,
                       epsilon = grid_epsilon) 
  
  
  samps$unnormalized_log_posterior <- mapply(function(x, y) update_lp_theta_given_z_after_observation(new_observation = z_bar, 
                                                                                                      theta = x, 
                                                                                                      epsilon = y, 
                                                                                                      updated_posterior = estimated_posterior_df,
                                                                                                      alpha_epsilon = alpha_epsilon, 
                                                                                                      beta_epsilon = beta_epsilon), 
                                             samps$theta, 
                                             samps$epsilon)
  
  
  samps$normalized_log_posterior <- samps$unnormalized_log_posterior - matrixStats::logSumExp(samps$unnormalized_log_posterior)
  samps <- samps %>% 
    group_by(theta) %>% 
    summarise(log_posterior = matrixStats::logSumExp(normalized_log_posterior) + 
                log(1/length(normalized_log_posterior))) 
  
  samps$feature_index <- feature_index
  
  
  return(samps)
  
  
}

# single feature 
# for trial 1 when beta distribution hasn't been destroyed 

first_update_grid_approximate_with_theta <- function(feature_index = 1, 
                                     thetas = seq(0.01, .99, .01), 
                                     z_bar, 
                                     epsilon, 
                                     alpha_theta, 
                                     beta_theta,
                                     alpha_epsilon, 
                                     beta_epsilon){
  
  posterior_df <- tibble("theta" = thetas)
  posterior_df$unnormalized_log_posterior <- sapply(thetas, 
                                                    function(x){ 
                                                      lp_theta_given_z(z_bar = z_bar, 
                                                                       theta = x, 
                                                                       epsilon = epsilon, 
                                                                       alpha_theta = alpha_theta, 
                                                                       beta_theta = beta_theta,
                                                                       alpha_epsilon = alpha_epsilon, 
                                                                       beta_epsilon = beta_epsilon)})
  posterior_df$normalized_log_posterior <- posterior_df$unnormalized_log_posterior - matrixStats::logSumExp(posterior_df$unnormalized_log_posterior)
  posterior_df$feature_index <- feature_index
  
  return(posterior_df)
  
}

first_update_grid_approximate_with_theta_and_epsilon <- function(
  feature_index,
  grid_theta = seq(0.01, .99, .01),
  grid_epsilon = seq(0.01, .99, .01), 
  z_bar, 
  alpha_theta, 
  beta_theta,
  alpha_epsilon, 
  beta_epsilon
){
  samps <- expand_grid(theta = grid_theta,
                       epsilon = grid_epsilon) 
  
  
  
  
  samps$unnormalized_log_posterior <- mapply(function(x, y) lp_theta_given_z(z_bar = z_bar, 
                                                                                                theta = x, 
                                                                                                epsilon = y, 
                                                                                                alpha_theta = alpha_theta, 
                                                                                                beta_theta = beta_theta, 
                                                                                                alpha_epsilon = alpha_epsilon, 
                                                                                                beta_epsilon = beta_epsilon), 
                                             samps$theta, 
                                             samps$epsilon)
  
  
  samps$normalized_log_posterior <- samps$unnormalized_log_posterior - matrixStats::logSumExp(samps$unnormalized_log_posterior)
  
  samps <- samps %>% 
    group_by(theta) %>% 
    summarise(
      unnormalized_log_posterior = matrixStats::logSumExp(unnormalized_log_posterior) + 
        log(1/length(unnormalized_log_posterior)), 
      log_posterior = matrixStats::logSumExp(normalized_log_posterior) + 
                log(1/length(normalized_log_posterior))
      ) 
  samps$feature_index <- feature_index
  
  return(samps)
  
}
  
  
  



