all_stimuli = get_all_stimuli()
backgrounds = get_background_stimuli(all_stimuli)
remaining_pool = remove_used_stimuli(all_stimuli, backgrounds)
all_blocks_info = generate_all_block_info(backgrounds, remaining_pool)
all_blocks = generate_all_blocks(all_blocks_info)


console.log(all_blocks)

