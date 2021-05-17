thetas = seq(0.1,0.9,0.2)

IGs <- c()

for (i in seq(1,15,1)) {
  
  
  previous_dist <- dbeta(thetas, 1, i) /length(previous_dist)
  current_dist <- dbeta(thetas, 1, i+1) /length(previous_dist)
  
  previous_entropy <- -sum((previous_dist) * log(previous_dist))
  current_entropy <- -sum((current_dist) * log(current_dist))
  
  
  IG <- previous_entropy - current_entropy
  IGs <- c(IGs, IG)
  
}

plot(seq(1,15,1), IGs)