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



ALL_TASKS =  ["math", "memory", "curiosity"]

SHOW_INTRO = true
NUM_BLOCKS = 8
NUM_TRIAL_PER_BLOCK = [6]
DEVIANT_POSITIONS = [1, 3, 5] // don't forget adding the no deviant condition 
NUM_DEVIANTS = [1]

SPECIES_NUM = 24
SHOW_SIMPLE = true 
CURRENT_TASK = ALL_TASKS[Math.floor(Math.random()*ALL_TASKS.length)]





// current stimuli: 24 complex, 20 simple 
NUM_COMPLEX_CREATURES = 24
NUM_SIMPLE_CREATURES = 20

// math version: 
// 8 complex 8 simple creature in total
// memory question version: 
// 12 complex 12 simple creature in total 
// curiosity question version: 
// 12 complex 12 simple creature in total 


all_stimuli = get_all_stimuli(NUM_COMPLEX_CREATURES, NUM_SIMPLE_CREATURES)


all_blocks_information = generate_all_block(num_blocks = NUM_BLOCKS,
                                            num_trial_per_block = NUM_TRIAL_PER_BLOCK,
                                            stimuli_array = all_stimuli,
                                            all_deviant_position_array = DEVIANT_POSITIONS,
                                            num_deviants = NUM_DEVIANTS,
                                            task_name = CURRENT_TASK, 
                                            show_simple = SHOW_SIMPLE)



// below is for demo 

 curiosity_all_blocks =  generate_all_block(num_blocks = NUM_BLOCKS,
                                            num_trial_per_block = NUM_TRIAL_PER_BLOCK,
                                            stimuli_array = all_stimuli,
                                            all_deviant_position_array = DEVIANT_POSITIONS,
                                            num_deviants = NUM_DEVIANTS,
                                            task_name = "curiosity", 
                                            show_simple = SHOW_SIMPLE)                           
math_all_blocks =  generate_all_block(num_blocks = NUM_BLOCKS,
    num_trial_per_block = NUM_TRIAL_PER_BLOCK,
    stimuli_array = all_stimuli,
    all_deviant_position_array = DEVIANT_POSITIONS,
    num_deviants = NUM_DEVIANTS,
    task_name = "math", 
    show_simple = SHOW_SIMPLE)    

memory_all_blocks =   generate_all_block(num_blocks = NUM_BLOCKS,
    num_trial_per_block = NUM_TRIAL_PER_BLOCK,
    stimuli_array = all_stimuli,
    all_deviant_position_array = DEVIANT_POSITIONS,
    num_deviants = NUM_DEVIANTS,
    task_name = "memory", 
    show_simple = SHOW_SIMPLE)            
    
console.log(math_all_blocks)
console.log(curiosity_all_blocks)


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


