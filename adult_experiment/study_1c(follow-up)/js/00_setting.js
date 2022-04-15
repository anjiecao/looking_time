



// Experiment setup
    var verbose = true
    var timenum = Date.now();
    var turkInfo = jsPsych.turk.turkInfo();
    var Prolific = true
    var prolific_code = "??????"
    var forced_short_viewing_duration_base = 5
    var forced_long_viewing_duration = 15 * 1000
    
    var subject_id = 'SS' + timenum;
    var survey_code = 'SS' + timenum






ALL_TASKS =  [ "memory"]

SHOW_INTRO = true
NUM_BLOCKS = 10
NUM_TRIAL_PER_BLOCK = [8]
DEVIANT_POSITIONS = [1, 1, 3, 3, 5, 5, 7, 7] // don't forget adding the no deviant condition 
NUM_DEVIANTS = [1]

SPECIES_NUM = 28
CURRENT_TASK = ALL_TASKS[Math.floor(Math.random()*ALL_TASKS.length)]





// current stimuli: 28 unity stimulus



all_stimuli = get_all_stimuli(SPECIES_NUM)


all_blocks_information = generate_all_block(num_blocks = NUM_BLOCKS,
                                            num_trial_per_block = NUM_TRIAL_PER_BLOCK,
                                            stimuli_array = all_stimuli,
                                            all_deviant_position_array = DEVIANT_POSITIONS,
                                            num_deviants = NUM_DEVIANTS,
                                            task_name = CURRENT_TASK)



/*
checking_block_information(all_blocks_information = all_blocks_information, 
                           blcok_number = NUM_BLOCKS, 
                           num_trial_per_block = NUM_TRIAL_PER_BLOCK
                            )
*/

if (verbose){
console.log("All stimuli path: ")
console.log(all_stimuli)
console.log("All blocks information:")
console.log(all_blocks_information)
}


