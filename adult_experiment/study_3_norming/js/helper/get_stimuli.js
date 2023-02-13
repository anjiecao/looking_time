// get paths for all stimuli


function get_all_stimuli(){
    all_stimuli = []
    animacy_level = ["animate", "inanimate"]
    pose_level = ["left", "right"]


    TOTAL_STIM_EACH_LEVEL = 12
    MAIN_DIR = "media/padded_stims/"
    for (var i = 1; i < TOTAL_STIM_EACH_LEVEL + 1; i++){
      for (var animacy_index = 0; animacy_index < animacy_level.length; animacy_index++){
        for (var pose_index = 0; pose_index < pose_level.length; pose_index++){
            if (i < 10){
                i_string = "00" + i
            } else{
                i_string = "0" + i
            }
            current_stimuli_path = MAIN_DIR + animacy_level[animacy_index] +  '_' + i_string + "_" +
            pose_level[pose_index] + ".png"
            all_stimuli.push(current_stimuli_path)

        }
        

        }
        
      }
      return(all_stimuli)

}


function get_all_stimuli_info(all_stimuli){
    all_stimuli_info = []

    for (var i = 0; i < all_stimuli.length; i++){
        stimulus = {
            stimulus: all_stimuli[i],
            animacy: (all_stimuli[i].includes("inanimate")) ? "inanimate" : "animate",  
            pose:  (all_stimuli[i].includes("left")) ? "left" : "right"
        }

        single_stimulus = structuredClone(stimulus) 
        single_stimulus.number = "single"

        pair_stimulus = structuredClone(stimulus)
        pair_stimulus.number = "pair"

        all_stimuli_info.push(single_stimulus)
        all_stimuli_info.push(pair_stimulus)

    }

    return (all_stimuli_info)

}