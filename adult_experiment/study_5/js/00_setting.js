all_stimuli = get_all_stimuli()
all_distractors = get_all_distractor()

stimuli_and_distractors = all_stimuli.concat(all_distractors)

backgrounds = get_background_stimuli(all_stimuli)
remaining_pool = remove_used_stimuli(all_stimuli, backgrounds)

all_blocks_info = generate_all_block_info(backgrounds, remaining_pool, all_distractors)
console.log(all_blocks_info)
all_blocks_info = reorder_all_blocks(all_blocks_info)
console.log(all_blocks_info)

all_blocks = generate_all_blocks(all_blocks_info, all_distractors)



check_violation_type(all_blocks_info.sort())


demog  = get_demog_questions()

instruction = get_instruction()

test_stimuli_repeating(all_blocks_info)

/*
console.log(all_blocks_info)
console.log(all_blocks)
console.log(all_complexity_rating)
console.log(all_similarity_rating)
*/