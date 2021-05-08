make_creature <- function(
  total_feature,
  # currently assuming all situations where there are features the theta are the same 
  feature_theta, 
  # complexity controls for the proportion of the features 
  feature_ratio
){
  
  feature_n = total_feature * feature_ratio
  sample(c(rep(feature_theta, feature_n), 
           rep(1-feature_theta, total_feature -feature_n)))
  
  
}

make_dissimilar_creature <- function(
  creature, 
  dissimilar_ratio # proportion of features flipped 
){
  
  
  # first figure out where the feature theta are at 
  feature_pos <- which(creature > 0.5)
  non_feature_pos <- which(creature  < 0.5 | creature == 0.5)
  total_feature_n <- length(feature_pos)
  
  feature_flip <- floor(total_feature_n * dissimilar_ratio)
  
  # change feature to non-feature
  feature_change_pos <- sample(feature_pos, 
                               feature_flip, 
                               replace = FALSE)
  
  creature[feature_change_pos] <- 1 - creature[feature_change_pos]
  
  # change non-feature to feature
  non_feature_change_pos <- sample(non_feature_pos, 
                                   feature_flip, 
                                   replace = FALSE)
  
  creature[non_feature_change_pos] <- 1 - creature[non_feature_change_pos]  
  
  dissimilar_stimuli = creature
  
  return(dissimilar_stimuli)
}