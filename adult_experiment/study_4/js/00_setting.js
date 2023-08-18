all_stimuli = get_all_stimuli()
all_block_information = get_block_information(all_stimuli)
all_blocks = generate_all_blocks(all_block_information, familiarization_time = 3000)
console.log(all_blocks)

demog  = get_demog_questions()

instruction = get_instruction()

console.log(all_blocks_info)
console.log(all_blocks)
console.log(all_complexity_rating)
console.log(all_similarity_rating)