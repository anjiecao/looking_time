// Experiment setup
    var verbose = true
    var timenum = Date.now();
    var turkInfo = jsPsych.turk.turkInfo();
    var Prolific = true
    var prolific_code = "??????"
    var forced_short_viewing_duration_base = 10 // base is 10 * 
    var forced_long_viewing_duration = 15 * 1000
    
    var subject_id = 'SS' + timenum;
    var survey_code = 'SS' + timenum

TEST_RUN = 0//test run with smaller number of species etc.

if (TEST_RUN == 1) {
  SHOW_INTRO = false
  NUM_BLOCKS = 12
  NUM_TRIAL_PER_BLOCK = [1]
  DEVIANT_POSITIONS = [1]
  BREAK_EVERY_N_BLOCKS = 1
  // number of species per complexity level
  SPECIES_NUM = 4
  NUM_DEVIANTS = [0]
  SHOW_SIMILAR = 0


}
else {
  SHOW_INTRO = true
  NUM_BLOCKS = 8
  NUM_TRIAL_PER_BLOCK = [6]
  DEVIANT_POSITIONS = [null, null, 1, 1, 3, 3, 5, 5]
  SPECIES_NUM = 24
  SHOW_SIMILAR = false
  SHOW_SIMPLE = false 
  SHOW_COMPLEX = true

}




all_simple_stimuli = get_all_stimuli(TEST_RUN, 24, 
                                    show_similar = false, 
                                    show_simple = true,
                                    show_complex = false, 
                                    )
all_simple_blocks_information = generate_all_block(num_blocks = NUM_BLOCKS,
                                      num_trial_per_block = NUM_TRIAL_PER_BLOCK,
                                      stimuli_array = all_stimuli,
                                      all_deviant_position_array = DEVIANT_POSITIONS,
                                      num_species = SPECIES_NUM,
                                      show_similar = false, 
                                      show_simple = true, 
                                      show_complex = false
                                    )

all_complex_stimuli = get_all_stimuli(TEST_RUN, SPECIES_NUM, 
                                      show_similar = false, 
                                      show_simple = false,
                                      show_complex = true, 
                                      )

all_complex_blocks_information = generate_all_block(num_blocks = NUM_BLOCKS,
                                        num_trial_per_block = NUM_TRIAL_PER_BLOCK,
                                        stimuli_array = all_stimuli,
                                        all_deviant_position_array = DEVIANT_POSITIONS,
                                        num_species = SPECIES_NUM,
                                        show_similar = false, 
                                        show_simple = false, 
                                        show_complex = true
                                        )


checking_block_information(all_blocks_information = all_complex_blocks_information, 
                              blcok_number = NUM_BLOCKS, 
                              num_trial_per_block = NUM_TRIAL_PER_BLOCK, 
                              show_similar = false, 
                              show_simple = false, 
                              show_complex = true
                               )
/*
if (verbose){
console.log("All stimuli path: ")
console.log(all_stimuli)
console.log("All blocks information:")
console.log(all_blocks_information)
}*/


