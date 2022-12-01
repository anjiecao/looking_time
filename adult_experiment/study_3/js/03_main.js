

// fix me: needs to become functi so prevent loading issue
function get_main_testing_procedure(INTERVAL_TIME, EXPOSURE_LENGTH, COMPLEXITY_LEVEL, BLOCK_NUM,
                                    ALL_FAM_NOVEL_PAIRS){

                                      
    all_blocks = []
    // to see if we need to repeat the sampling loop twice 
    combo_rep = BLOCK_NUM / (EXPOSURE_LENGTH.length * COMPLEXITY_LEVEL.length)


    all_simple_stimuli = ALL_FAM_NOVEL_PAIRS.filter(item => item[0].includes("simple"))
    all_complex_stimuli = ALL_FAM_NOVEL_PAIRS.filter(item => item[0].includes("complex"))

    for (var rep_i = 0; rep_i < combo_rep; rep_i ++){
        // loop through exposure length 
        for (var exp_i = 0; exp_i < EXPOSURE_LENGTH.length; exp_i++){
          current_exposure_length = EXPOSURE_LENGTH[exp_i]
          current_stimuli_pair = all_simple_stimuli[exp_i + rep_i * EXPOSURE_LENGTH.length]
          current_block = generate_block(current_stimuli_pair, current_exposure_length, INTERVAL_TIME)
          all_blocks.push(current_block)
        }
    }

    for (var rep_i = 0; rep_i < combo_rep; rep_i ++){
      // loop through exposure length 
      for (var exp_i = 0; exp_i < EXPOSURE_LENGTH.length; exp_i++){
        current_exposure_length = EXPOSURE_LENGTH[exp_i]
        current_stimuli_pair = all_complex_stimuli[exp_i + rep_i * EXPOSURE_LENGTH.length]
        current_block = generate_block(current_stimuli_pair, current_exposure_length, INTERVAL_TIME)
        all_blocks.push(current_block)
      }
  }

  shuffleArray(all_blocks)
  return(all_blocks)
  
}
