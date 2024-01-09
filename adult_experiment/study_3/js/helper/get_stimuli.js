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


// get stimuli into collection of eight background 
// animate / inanimate; left / right; pair / non-pair 
// 4 animate - 2 left 2 right, 1 each on pair, 1 each on singleton
// 4 inaimate - 2 left 2 right 
// return an object of eight feature
function get_background_stimuli(all_stimuli){

    animate_left = getRandomSubarray(all_stimuli.filter(stimulus => !stimulus.includes("inanimate") & stimulus.includes("left")), 4)
    idArray = animate_left.map(item => {
        let match = item.match(/\d+/g);
        return match ? match[0] : null;
    })
    excluding_stimuli = all_stimuli.filter(item => {
        return idArray.some(substring => item.includes(substring)) & !item.includes("inanimate");
    });    
    remaining_stimuli = all_stimuli.filter(item => !excluding_stimuli.includes(item))

    animate_right = getRandomSubarray(remaining_stimuli.filter(stimulus => !stimulus.includes("inanimate") & stimulus.includes("right")), 4)
    idArray = animate_right.map(item => {
        let match = item.match(/\d+/g);
        return match ? match[0] : null;
    })
    excluding_stimuli = remaining_stimuli.filter(item => {
        return idArray.some(substring => item.includes(substring)) & !item.includes("inanimate");
    });    
    remaining_stimuli = remaining_stimuli.filter(item => !excluding_stimuli.includes(item))

    inanimate_left = getRandomSubarray(all_stimuli.filter(stimulus => stimulus.includes("inanimate") & stimulus.includes("left")), 4)
    idArray = inanimate_left.map(item => {
        let match = item.match(/\d+/g);
        return match ? match[0] : null;
    })
    excluding_stimuli = remaining_stimuli.filter(item => {
        return idArray.some(substring => item.includes(substring)) & !item.includes("inanimate");
    });    
    remaining_stimuli = remaining_stimuli.filter(item => !excluding_stimuli.includes(item))


    inanimate_right = getRandomSubarray(remaining_stimuli.filter(stimulus => stimulus.includes("inanimate") & stimulus.includes("right")), 4)


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
        //console.log("printing background type, deviant object")
        //console.log(background_type, deviant_object)


        // [animacy, number, pose]

        deviant_type_array = deviant_object.deviant_type.split("_")
      
        // here we impose the first item of the background would be used as the one in deviant block
        background_for_deviant = background_collection[background_type][0]
        var numberPattern = /\d+/g;
        var background_id = background_for_deviant.match(numberPattern)[0];

        deviant_animacy = deviant_type_array[0]
        deviant_number = deviant_type_array[1]
        deviant_pose = deviant_type_array[2]

        if(deviant_object.violation_type == "animacy"){
            // if the violation is animacy violation, takes: different animacy, same orientation stimulus  
            if(deviant_animacy == "inanimate"){
                deviant = getRandomSubarray(remaining_pool.filter(stimulus => stimulus.includes("inanimate") & stimulus.includes(deviant_pose)), 1)[0]
            }else{
                deviant = getRandomSubarray(remaining_pool.filter(stimulus => !stimulus.includes("inanimate") & stimulus.includes(deviant_pose)), 1)[0]
            }

        }else if(deviant_object.violation_type == "pose"){
           // if the violation is pose: same animacy, same id, different orientation 
  
           if(deviant_pose == "left"){
                deviant = background_for_deviant.replace("right", "left")
            }else{
                deviant = background_for_deviant.replace("left", "right")
            }

        }else if(deviant_object.violation_type == "number"){
            // if the violation is number: same animacy, same id, same orientation 
            deviant = background_for_deviant

        }else if(deviant_object.violation_type == "identity"){
            // if the violation is identity, same animacy, same orientation, different id
            if(deviant_animacy == "inanimate"){
                deviant = getRandomSubarray(remaining_pool.filter(stimulus => stimulus.includes("inanimate") & !stimulus.includes(background_id) & stimulus.includes(deviant_pose)), 1)[0]
            }else{
                deviant = getRandomSubarray(remaining_pool.filter(stimulus => !stimulus.includes("inanimate") & !stimulus.includes(background_id) & stimulus.includes(deviant_pose)), 1)[0]
            }

        }

        remaining_pool = remaining_pool.filter(stimulus => !(deviant == stimulus))


        trials = [2, 4, 6]
        trial_number = trials[Math.floor(Math.random() * 3)]

        deviant_block_info = {
            block_type: "deviant_block", 
            background_stimulus: background_for_deviant, 
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
        trials = [2, 4, 6]
        trial_number = trials[Math.floor(Math.random() * 3)]

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








