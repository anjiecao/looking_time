function get_preference_ratings(all_blocks){

    all_stimuli_pair = []
    for (var b = 0; b < all_blocks.length; b++){
        current_block = all_blocks[b]
        paired_trial = current_block[3] // sorry about the magic number that's how it is packaged
        all_stimuli_pair.push([paired_trial.data.left_stimulus_raw, paired_trial.data.right_stimulus_raw])
    }

    all_prefernece_rating_trials = []
    
    shuffleArray(all_stimuli_pair)
    for (var i = 0; i < all_stimuli_pair.length; i++){
        current_stimuli_pair = all_stimuli_pair[i]
        trial = get_paired_preference_rating(current_stimuli_pair)
        all_prefernece_rating_trials.push(trial)
    }
    return all_prefernece_rating_trials

}