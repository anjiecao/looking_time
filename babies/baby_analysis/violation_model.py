import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import bootstrapped.bootstrap as bs
import bootstrapped.stats_functions as bs_stats

# Read the CSV and specify column names
df = pd.read_csv('baby_analysis/processed_data/model_data/summarized_results_detailed_new.csv',
                 names=["sub_id", "batch_id", "trial_num", "stim_sequence", "violation", 
                        "epsilon", "b_val", "d_val", "mu_prior", "v_prior", "alpha_prior", 
                        "beta_prior", "n_samples"],
                 header=None)  # add header=None if the file does not contain a header

df = df.groupby(['batch_id', 'sub_id']).tail(1)

# Now df contains the data with the specified column names
df['test_type'] = ['deviant' if 'D' in seq else 'background' for seq in df['stim_sequence']]

# Create the 'fam_duration' column
df['fam_duration'] = df['stim_sequence'].str.len() - 1

# Function to calculate bootstrapped mean and CI
def mean_ci_boot(x):
    mean, lower, upper = bs.bootstrap(x, stat_func=bs_stats.mean, return_distribution=False)
    return mean, lower, upper

unique_combinations = df[['epsilon', 'mu_prior', 'v_prior', 'beta_prior', 'alpha_prior']].drop_duplicates()

for index, row in unique_combinations.iterrows():
    subset_data = df[
        (df['epsilon'] == row['epsilon']) & 
        (df['mu_prior'] == row['mu_prior']) & 
        (df['v_prior'] == row['v_prior']) &
        (df['beta_prior'] == row['beta_prior']) &
        (df['alpha_prior'] == row['alpha_prior'])
    ]
    
    # Create FacetGrid
    g = sns.FacetGrid(subset_data, row = "alpha_prior", col="beta_prior")
    g.map_dataframe(
        sns.pointplot,
        x='trial_num',
        y='n_samples',
        hue='test_type',
        dodge=0.1,
        ci="sd"  # You can use other methods for CI too
    )
    
    # Customize the plot
    g.add_legend(title='test_type')
    g.set_axis_labels('fam duration', 'n_samples')
    title_str = f"epsilon = {row['epsilon']}, mu_prior = {row['mu_prior']}, v_prior = {row['v_prior']}, beta_prior = {row['beta_prior']}, alpha_prior = {row['alpha_prior']}"
    g.fig.suptitle(title_str, y=1.02)  # Adjust y position according to your needs
    
    plt.show()