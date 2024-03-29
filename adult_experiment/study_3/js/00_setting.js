all_stimuli = get_all_stimuli()
backgrounds = get_background_stimuli(all_stimuli)
remaining_pool = remove_used_stimuli(all_stimuli, backgrounds)


all_blocks_info = generate_all_block_info(backgrounds, remaining_pool)
check_violation_type(all_blocks_info)
shuffleArray(all_blocks_info)
all_blocks = generate_all_blocks(all_blocks_info)

all_complexity_rating = get_complexity_raitng_for_all_blocks(all_blocks_info)
all_similarity_rating  = get_similarity_rating_for_all_blocks(all_blocks_info)
demog  = get_demog_questions()

instruction = get_instruction()

console.log(all_blocks_info)
console.log(all_blocks)
console.log(all_complexity_rating)
console.log(all_similarity_rating)