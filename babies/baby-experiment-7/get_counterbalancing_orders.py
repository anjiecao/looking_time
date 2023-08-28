import itertools
import csv

# Define the conditions
conditions = ['animacy', 'identity', 'pose', 'number']


# Get all combinations of 3 conditions from the set (2,3,4,5)
combinations = list(itertools.combinations(conditions, 3))

# Initialize a list to store the final orders
final_orders = []

# For each combination
for combo in combinations:
    # Generate all permutations of the combination
    permutations = list(itertools.permutations(combo))
    
    # For each permutation
    for perm in permutations:
        # Insert condition 1 in each possible position
        for pos in range(4):
            order = list(perm)
            order.insert(pos, 'background')
            final_orders.append(order)

# Save to CSV
with open('orders.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(final_orders)

print(f"Saved {len(final_orders)} orders to orders.csv.")
