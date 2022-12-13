// get paths for all stimuli


function get_all_stimuli(){
    all_stimuli = []
    animacy_level = ["animate", "inanimate"]
    pose_level = ["left", "right"]


    TOTAL_STIM_EACH_LEVEL = 50
    MAIN_DIR = "media/stims/"
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


// get stimuli into collection of eight background 
// animate / inanimate; left / right; pair / non-pair 
// 4 animate - 2 left 2 right, 1 each on pair, 1 each on singleton
// 4 inaimate - 2 left 2 right 
// return an object of eight feature
function get_background_stimuli(all_stimuli){
    animate_left = getRandomSubarray(all_stimuli.filter(stimulus => !stimulus.includes("inanimate") & stimulus.includes("left")), 4)
    animate_right = getRandomSubarray(all_stimuli.filter(stimulus => !stimulus.includes("inanimate") & stimulus.includes("right")), 4)
    inanimate_left = getRandomSubarray(all_stimuli.filter(stimulus => stimulus.includes("inanimate") & stimulus.includes("left")), 4)
    inanimate_right = getRandomSubarray(all_stimuli.filter(stimulus => stimulus.includes("inanimate") & stimulus.includes("right")), 4)

    console.log(animate_left)
    console.log(animate_right)
    console.log(inanimate_left) 
    console.log(inanimate_right)


    background_collection = {
        animate_single_left: animate_left.slice(0, 2), 
        animate_single_right: animate_right.slice(0, 2),
        animate_pair_left: animate_left.slice(2, 4),
        animate_pair_right: animate_right.slice(2, 4),
        inanimate_single_left: inanimate_left.slice(0, 2), 
        inanimate_single_right: inanimate_right.slice(0, 2),
        inanimate_pair_left: inanimate_left.slice(2, 4),
        inanimate_pair_right: inanimate_right.slice(2, 4)

    }
    
    return background_collection

}

function get_deviant(background){

    violation_type = ["animacy", "identity", "pose", "number"]
    current_violation = getRandomSubarray(violation_type, 1)
    if (violation)

    
}

all_stimuli = get_all_stimuli()
console.log(all_stimuli)
console.log(get_background_stimuli(all_stimuli))



// get stimuli into 




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