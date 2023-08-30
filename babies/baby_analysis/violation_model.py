import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import bootstrapped.bootstrap as bs
import bootstrapped.stats_functions as bs_stats

# # Read the CSV and specify column names
# df = pd.read_csv('processed_data/model_data/summarized_results_detailed_new.csv',
#                  names=["sub_id", "batch_id", "trial_num", "stim_sequence", "violation", 
#                         "epsilon", "b_val", "d_val", "mu_prior", "v_prior", "alpha_prior", 
#                         "beta_prior", "n_samples"],
#                  header=None)  # add header=None if the file does not contain a header

# # grab forced exposure from first exposure
# df['forced_exposure_max'] = df.groupby(['batch_id', 'sub_id','stim_sequence'])['n_samples'].transform('first')

# # set baseline trials to 5 or 10, doesn't matter since no fam occurred
# num_baseline = len(df[df['stim_sequence'] == 'B'])
# random_values = np.random.choice([5, 10], size=num_baseline)
# df.loc[df['stim_sequence'] == 'B', 'forced_exposure_max'] = random_values

# df = df.groupby(['batch_id', 'sub_id','stim_sequence']).tail(1)

# # # Now df contains the data with the specified column names
# df['test_type'] = ['nov' if 'D' in seq else 'fam' for seq in df['stim_sequence']]

# # # Create the 'fam_duration' column
# df['fam_duration'] = df['stim_sequence'].str.len() - 1

# df.to_csv("processed_data/model_data/sliced_model_data.csv")

df = pd.read_csv("processed_data/model_data/sliced_model_data.csv")

# Group by the parameters and test_type, and then filter for parameter combinations that appear in both test types
common_combinations = df.groupby(['epsilon', 'mu_prior', 'v_prior', 'beta_prior', 'alpha_prior'])
common_combinations = common_combinations.filter(lambda x: x['test_type'].nunique() > 1)

# Get unique combinations of the specified parameters that are now common to both test types
unique_combinations = common_combinations[['epsilon', 'mu_prior', 'v_prior', 'beta_prior', 'alpha_prior']].drop_duplicates()

grouped_means = df.groupby(
    ['epsilon', 'mu_prior', 'v_prior', 'beta_prior', 'alpha_prior', 'stim_sequence']
).agg(
    {'n_samples': 'mean', 'forced_exposure_max': 'first', 'fam_duration': 'first', 'test_type': 'first'}
).reset_index()

grouped_means.to_csv('processed_data/model_data/grouped_model_means.csv', index=False)

n_rows = int(np.ceil(np.sqrt(len(unique_combinations))))
n_cols = int(np.ceil(len(unique_combinations) / n_rows))

fig, axes = plt.subplots(n_rows, n_cols, figsize=(15, 15), sharex=True, sharey=True)

sns.set(style="ticks", rc={"lines.linewidth": 0.7})

for index, (row, ax) in enumerate(zip(unique_combinations[1:].iterrows(), axes.flatten())):
    _, params = row
    subset_data = common_combinations[
        (common_combinations['epsilon'] == params['epsilon']) & 
        (common_combinations['mu_prior'] == params['mu_prior']) & 
        (common_combinations['v_prior'] == params['v_prior']) &
        (common_combinations['beta_prior'] == params['beta_prior']) &
        (common_combinations['alpha_prior'] == params['alpha_prior'])
    ]

    sns.pointplot(
        ax=ax,
        data=subset_data,
        x='fam_duration',
        y='n_samples',
        hue='test_type',
        dodge=0.1,
        ci=95
    )

    ax.get_legend().remove()

# Remove empty subplots
for ax in axes.flatten()[index+1:]:
    ax.remove()

plt.tight_layout()
plt.show()

for index, row in unique_combinations[1:].iterrows():

    print(row)

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
        ci=95  # You can use other methods for CI too
    )
    
    # Customize the plot
    g.add_legend(title='test_type')
    g.set_axis_labels('fam duration', 'n_samples')
    title_str = f"epsilon = {row['epsilon']}, mu_prior = {row['mu_prior']}, v_prior = {row['v_prior']}, beta_prior = {row['beta_prior']}, alpha_prior = {row['alpha_prior']}"
    g.fig.suptitle(title_str, y=1.02)  # Adjust y position according to your needs
    
    plt.show()

    