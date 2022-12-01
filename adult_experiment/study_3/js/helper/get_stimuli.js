// get paths for all stimuli

function get_all_stimuli(COMPLEXITY_LEVEL){
    all_stimuli = []
    TOTAL_STIM_EACH_LEVEL = 20
    MAIN_DIR = "media/stimuli/unified/"
    for (var i = 1; i < TOTAL_STIM_EACH_LEVEL + 1; i++){
      for (var complexity_index = 0; complexity_index < COMPLEXITY_LEVEL.length; complexity_index++){
        
          current_stimuli_path = MAIN_DIR + COMPLEXITY_LEVEL[complexity_index] +  '_'
                                          + i 
                                          + ".gif"
        
          all_stimuli.push(current_stimuli_path)

        }
      }
      return(all_stimuli)

}


// get stimul into fam - novel pair 
function get_fam_novel_pair(ALL_STIMULI, BLOCK_NUM, COMPLEXITY_LEVEL){
    // figure out how many pairs to get in each level 
    pair_each_level = BLOCK_NUM / (COMPLEXITY_LEVEL.length)
    all_stimuli_pair = []

    // make a copy so that we can modify 
    full_stimuli_set = ALL_STIMULI
    for (var i = 0; i < pair_each_level; i++){
        for (var c = 0; c < COMPLEXITY_LEVEL.length; c++){
            // randomply sample two 
            current_complexity_level = COMPLEXITY_LEVEL[c]
            current_stimuli_set = full_stimuli_set.filter(stimulus => stimulus.includes(current_complexity_level))
            current_stimuli_pair = getRandomSubarray(current_stimuli_set, 2)

            // add to the main 
            all_stimuli_pair.push(current_stimuli_pair)
            
            // make sure the sampled two are discarded 
            full_stimuli_set = full_stimuli_set.filter(stimulus => !(current_stimuli_pair.includes(stimulus)))
        }
    }
    return all_stimuli_pair

}