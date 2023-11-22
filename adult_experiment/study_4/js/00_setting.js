all_stimuli = get_all_stimuli()

fam_trial_type = [[0, 4, 8], [1, 3, 9], [2, 5, 6]]
fam_trial_info = fam_trial_type[Math.floor(Math.random() * fam_trial_type.length)]

all_block_information = get_block_information(all_stimuli, fam_trial_params = fam_trial_info)
all_blocks = generate_all_blocks(all_block_information, familiarization_time = 3000)
console.log(fam_trial_info)
console.log(all_blocks)

demog  = get_demog_questions()
console.log(demog)

instruction = get_instruction()

