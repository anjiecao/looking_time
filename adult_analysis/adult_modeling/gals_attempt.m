% we're trying to estimate p(theta|z) 

posterior = likelihood * prior / marginal;

prior = beta(a,b) 

likelihood = prod(p_all_observations)

p_all_observations = p(z|y=1)*p(y=1|theta) + p(z|y=0)*p(y=0|theta)

p(y=1|theta) = theta
p(y=0|theta) = 1-theta

p(z|y=0) = [0.1, 0.9]; % for epsilon = 0.1
p(z|y=1) = [0.9, 0.1];