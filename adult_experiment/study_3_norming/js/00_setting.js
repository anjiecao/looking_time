/* read all the stimuli path */
all_stimuli = get_all_stimuli()
/* create object with stimuli properties of all stimuli path*/
all_stimuli_info = get_all_stimuli_info(all_stimuli)
shuffleArray(all_stimuli_info)

all_complexity_rating = get_all_complexity_rating(all_stimuli_info)
similarity_trial = generate_stimilarity_rating_trial(all_stimuli_info[0], all_stimuli_info[1], all_stimuli_info[2])





/*TBD*/
//all_complexity_rating = get_complexity_ratings(all_blocks_info)
//all_similarity_rating  = get_similarity_ratings(all_blocks_info)


//demog  = get_demog_questions()

//instruction = get_instruction()

console.log(all_stimuli)
console.log(all_stimuli_info)
console.log(all_complexity_rating)
//console.log(all_complexity_rating)
//console.log(all_similarity_rating)