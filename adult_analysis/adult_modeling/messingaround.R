beta_bernoulli <- function(success){
  log_prob <- lbeta(a+success,b+1-success) - lbeta(a,b)
  return(exp(log_prob))
}

#####################
# Small sample
#####################

# Example 1
a <- 5; b <- 4

lapply(0:1, beta_bernoulli)
plot(0:1,BetaBinom(0:1),type="b",xlab="r*",ylab="P(R=r*|Data)", main = "Posterior predictive: a=1, b=1",cex.axis= 1.5,cex.lab=1.5,lwd=4)


# function for predictive distribution
BetaBinom <- Vectorize(function(rp){
  log.val <- lchoose(np, rp) + lbeta(rp+a+r,b+n-r+np-rp) - lbeta(a+r,b+n-r)
  return(exp(log.val))
})

n <- 1; r <- 3; a <- 1; b <- 1; np <- 10
plot(1:10,BetaBinom(1:10),type="b",xlab="r*",ylab="P(R=r*|Data)", main = "Posterior predictive: a=1, b=1",cex.axis= 1.5,cex.lab=1.5,lwd=4)
