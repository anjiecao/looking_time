/* read all the stimuli path */
all_stimuli = get_all_stimuli()
/* create object with stimuli properties of all stimuli path*/
all_stimuli_info = get_all_stimuli_info(all_stimuli)
shuffleArray(all_stimuli_info)

all_similarity_rating_package = generate_all_similarity_rating_package(all_stimuli_info)
all_similarity_rating = all_similarity_rating_package.map(t => generate_stimilarity_rating_trial(t))

all_complexity_rating = get_all_complexity_rating(all_stimuli_info)

//

instruction = get_instruction()
demog  = get_demog_questions()

console.log(all_stimuli)
console.log(all_stimuli_info)
console.log(all_complexity_rating)
console.log(all_similarity_rating)