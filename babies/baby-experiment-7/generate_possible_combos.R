# Install and load the necessary library
if (!require(combinat)) {
  install.packages("combinat")
  library(combinat)
}

# Generate combinations of three conditions from the set (2,3,4,5)
conditions <- c(2,3,4,5)
combinations <- combinat::permn(conditions, 3)

# Initialize a list to store the final orders
final_orders <- list()

# For each combination
for (combo in combinations) {
  # Generate all permutations of the combination
  permutations <- combinat::permn(combo)
  
  # For each permutation
  for (perm in permutations) {
    # Insert condition 1 in each possible position
    for (pos in 1:4) {
      # Create the order
      order <- c(perm[1:(pos-1)], 1, perm[pos:3])
      
      # Add the order to the list of final orders
      final_orders <- append(final_orders, list(order))
    }
  }
}

# Convert the list of orders to a data frame
df <- do.call(rbind, final_orders)

# Save the data frame as an RDS file
saveRDS(df, file = "orders.rds")
