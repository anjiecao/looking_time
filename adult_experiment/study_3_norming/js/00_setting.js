/* read all the stimuli path */
all_stimuli = get_all_stimuli()
/* create object with stimuli properties of all stimuli path*/
all_stimuli_info = get_all_stimuli_info(all_stimuli)
shuffleArray(all_stimuli_info)

all_complexity_rating = get_all_complexity_rating(all_stimuli_info)

similarity_package = generate_similarity_rating_package(all_stimuli_info)
all_similarity_rating = generate_similarity_rating_blocks(similarity_package)
console.log(all_similarity_rating)





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