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

function remove_used_stimuli(all_stimuli, background_collection){

    remaining_stimuli = all_stimuli.filter(stimulus => (
        !background_collection.animate_single_left.includes(stimulus) & 
        !background_collection.animate_single_right.includes(stimulus) &
        !background_collection.animate_pair_left.includes(stimulus) & 
        !background_collection.animate_pair_right.includes(stimulus) & 
        !background_collection.inanimate_single_left.includes(stimulus) & 
        !background_collection.inanimate_single_right.includes(stimulus) & 
        !background_collection.inanimate_pair_left.includes(stimulus) & 
        !background_collection.inanimate_pair_right.includes(stimulus)
    
    ))
    return(remaining_stimuli)
}



function flip_feature(f){
    if (f == "inanimate"){
        new_f = "animate"
    }else if(f == "animate"){
        new_f = "inanimate"
    }else if(f == "single"){
        new_f = "pair"
    }else if(f == "pair"){
        new_f = "single"
    }else if(f == "left"){
        new_f = "right"
    }else if(f == "right"){
        new_f = "left"
    }
    return (new_f)
}

function get_violation_type(f){
    if (f == "inanimate" | f == "animate"){
        type = "animacy"
    }else if (f == "pair" | f == "single"){
        type = "number"
    }else{
        type = "pose"
    }
    return (type)
}


function get_deviant_object(background_type){

    // split into the different features
    background_array = background_type.split("_")
    
    // randomly deciding which one to violate 
    violation_index = Math.floor(Math.random() * 4)

    if (violation_index == 3){
        violation_type = "identity"
        deviant_array = background_array
    }else{
        // 
        violation_type = get_violation_type(background_array[violation_index])
        new_f = flip_feature(background_array[violation_index])
        // flip the feature 
        deviant_array = background_array
        deviant_array[violation_index] = new_f
    }

    // create deviant string 
    deviant_type = deviant_array.join("_")
    
    deviant_object = {
        violation_type: violation_type, 
        background_type: background_type, 
        deviant_type: deviant_type
    }

    return (deviant_object)
}



function generate_all_block_info(background_collection, remaining_pool){

    all_blocks = []
    // get all deviant blocks
    for (const background_type in background_collection){
        deviant_object = get_deviant_object(background_type)
        // [animacy, number, pose]

        deviant_type_array = deviant_object.deviant_type.split("_")
        if(deviant_type_array[0] == "inanimate"){
            deviant = getRandomSubarray(remaining_pool.filter(stimulus => stimulus.includes("inanimate") & stimulus.includes(deviant_type_array[2])), 1)[0]
        }else{
            deviant = getRandomSubarray(remaining_pool.filter(stimulus => !stimulus.includes("inanimate") & stimulus.includes(deviant_type_array[2])), 1)[0]
        }

        remaining_pool = remaining_pool.filter(stimulus => !(deviant == stimulus))
        trials = [2, 4, 6]
        trial_number = trials[Math.floor(Math.random() * 3)]

        deviant_block_info = {
            block_type: "deviant_block", 
            background_stimulus: background_collection[background_type][0], // there are two in each, in random order, just use the first one
            deviant_stimulus: deviant,
            background_type: background_type, 
            deviant_type: deviant_object.deviant_type, 
            violation_type: deviant_object.violation_type,
            trial_number:trial_number
        }

        all_blocks.push(deviant_block_info)
    }

    // get all background blocks
    for (const background_type in background_collection){
        background_block_info = {
            block_type: "background_block", 
            background_stimulus: background_collection[background_type][1], // there are two in each, use the second
            deviant_stimulus: null,
            background_type: background_type, 
            deviant_type:null,
            violation_type: null,
            trial_number: trial_number
        }

        all_blocks.push(background_block_info)
    }

    return (all_blocks)

}








