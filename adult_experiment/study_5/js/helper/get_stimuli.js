// get paths for all stimuli


function get_all_stimuli(){
    all_stimuli = []
    animacy_level = ["animate"]
    pose_level = ["left", "right"]


    TOTAL_STIM_EACH_LEVEL = 25
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



function get_all_distractor(){
    all_distractors = []
    animacy_level = ["animate"]
    pose_level = ["left", "right"]


    TOTAL_STIM_EACH_LEVEL = 40
    MAIN_DIR = "media/padded_stims/"
    for (var i = 26; i < TOTAL_STIM_EACH_LEVEL + 1; i++){
      for (var animacy_index = 0; animacy_index < animacy_level.length; animacy_index++){

        if (i < 10){
                i_string = "00" + i
        } else{
                i_string = "0" + i
        }
        
        // only needs to sample 1 of the two poses 
        current_stimuli_path = MAIN_DIR + animacy_level[animacy_index] +  '_' + i_string + "_" +
            pose_level[Math.floor(Math.random() * pose_level.length)] + ".png"
            all_distractors.push(current_stimuli_path)

        
        

        }
        
      }
      return(all_distractors)

}


// get stimuli into collection of sixteen background
// each block has one background and 0 - 1 deviant

// return an object of eight feature
function get_background_stimuli(all_stimuli){

    // generate all the unique id 
    total_stimuli_to_sample = 15
    idArray = all_stimuli.map(item => {
        let match = item.match(/\d+/g);
        return match ? match[0] : null;
    })
    idArray =  [...new Set(idArray)]
    

    background_stimuli_id = getRandomSubarray(idArray, total_stimuli_to_sample)
    background_stimuli = []
    MAIN_DIR = "media/padded_stims/"
    pose_level = ["left", "right"]

    for (var i = 0; i < background_stimuli_id.length; i++){
        current_stimuli_path = MAIN_DIR + "animate" +  '_' + background_stimuli_id[i] + "_" +
            pose_level[Math.floor(Math.random() * pose_level.length)] + ".png"
        background_stimuli.push(current_stimuli_path)
    }

    return background_stimuli

}

function remove_used_stimuli(all_stimuli, background_stimuli){


    // first get all stimuli into an array

    // stimuli array to only contain information about the animacy and identity 

    var reduced_all_stimuli_used = background_stimuli.map(item => {
    // Split the string by '/', take the last part, then split by '.', and take the first part
    const parts = item.split('/');
    const filename = parts[parts.length - 1].split('.')[0];

    // Now extract the part before '_left' or '_right'
    return filename.split('_left')[0].split('_right')[0];
    });

    

    // use the reduced array to filter down the remaining stimuli

    
    var remaining_stimuli = all_stimuli.filter(item => {
        // Find the part before the first underscore
        const parts = item.split('/');
        const filename = parts[parts.length - 1].split('.')[0];

    // Now extract the part before '_left' or '_right'
        reduced_id = filename.split('_left')[0].split('_right')[0];


        return !reduced_all_stimuli_used.includes(reduced_id)
        
    });
   
        
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


function flip_feature_given_violation(f, violation){
    if (violation == "animacy"){
        new_f = (f == "animate") ? "inanimate" : "animate"
    }else if(violation == "number"){
        new_f = (f == "single") ? "pair" : "single"
    }else if(violation == "pose"){
        new_f = (f == "left") ? "right" : "left"
    }
    return (new_f)

}

// this is to get id to index into the array
function get_violation_id(violation_type){
    if(violation_type == "animacy"){
        id = 0
    }else if(violation_type == "number"){
        id = 1
    }else if(violation_type == "pose"){
        id = 2
    }else{
        id = null
    }
    return id
}


function get_deviant_object(background_type, violation_type){

    // split into the different features
    // array is of the format [ANIMACY, NUMBER, POSE]
    background_array = background_type.split("_")
    violation_id = get_violation_id(violation_type)
    
    if (violation_type == "identity"){
        deviant_array = background_array
    }else{
        new_f = flip_feature_given_violation(background_array[violation_id], violation_type)
        // flip the feature 
        deviant_array = background_array
        deviant_array[violation_id] = new_f
    }

    deviant_type = deviant_array.join("_")
    
    var deviant_object = {
        violation_type: violation_type, 
        background_type: background_type, 
        deviant_type: deviant_type
    }

    return (deviant_object)
}



function generate_all_block_info(all_backgrounds, remaining_pool, all_distractors){

    all_blocks = []

    all_memory_test_type = [...Array(8).fill('appeared'),  ...Array(7).fill('distractor')];
    // sampled 1 from each levels, and creates 4 blocks for each level sampled
    exposure_duration_a  = [1, 2]
    exposure_duration_b  = [3, 4]
    exposure_duration_c = [5, 6]
    exposure_duration_d = [7, 8]
    exposure_duration_e = [9, 10]
    all_deviant_exposure_duration = [...Array(2).fill(exposure_duration_a[Math.floor(Math.random() * exposure_duration_a.length)]), 
    ...Array(2).fill(exposure_duration_b[Math.floor(Math.random() * exposure_duration_b.length)]), ...Array(2).fill(exposure_duration_c[Math.floor(Math.random() * exposure_duration_c.length)]), 
    ...Array(2).fill(exposure_duration_d[Math.floor(Math.random() * exposure_duration_d.length)]), ...Array(2).fill(exposure_duration_e[Math.floor(Math.random() * exposure_duration_e.length)])
                            ]

    all_background_exposure_duration = [...Array(1).fill(exposure_duration_a[Math.floor(Math.random() * exposure_duration_a.length)]), 
    ...Array(1).fill(exposure_duration_b[Math.floor(Math.random() * exposure_duration_b.length)]), ...Array(1).fill(exposure_duration_c[Math.floor(Math.random() * exposure_duration_c.length)]), 
    ...Array(1).fill(exposure_duration_d[Math.floor(Math.random() * exposure_duration_d.length)]), ...Array(1).fill(exposure_duration_e[Math.floor(Math.random() * exposure_duration_e.length)])
                            ]



    shuffleArray(all_memory_test_type)


    all_blocks_info = []

    for (var d_id = 0; d_id < all_deviant_exposure_duration.length; d_id++){

        // get the background 
        background_stimulus = all_backgrounds[d_id]

        // get the deviant with matched pose 
        background_pose = background_stimulus.includes("left") ? "left" : "right"
        var sampling_pool = remaining_pool.filter(item => item.includes(background_pose));
        deviant_stimulus = getRandomSubarray(sampling_pool, 1)[0]
        
    
        // get rid of the used deviant
        let match = deviant_stimulus.match(/\d+/g);
        deviant_id = match ? match[0] : null;
        remaining_pool = remaining_pool.filter(item => !item.includes(deviant_id))

         // get the distractor
     var memory_test_type = all_memory_test_type.pop()
     if(memory_test_type == "distractor"){
         memory_test_stimulus = all_distractors.pop()
     }else{
        
             options = [background_stimulus, deviant_stimulus]
             memory_test_stimulus = getRandomSubarray(options, 1)[0]
         
     }


       
        // set up the deviant block 
        deviant_block_info = {
            block_type: "deviant_block", 
            background_stimulus: background_stimulus, 
            deviant_stimulus: deviant_stimulus,
            exposure_duration:all_deviant_exposure_duration[d_id], 
            memory_test_type: memory_test_type, 
            memory_test_stimulus: memory_test_stimulus
        }

        all_blocks_info.push(deviant_block_info)

    }

    for (var b_id = 0; b_id < all_background_exposure_duration.length; b_id ++){

        // get the background 
        background_stimulus = all_backgrounds[ all_deviant_exposure_duration.length + b_id]


         // get the distractor
     var memory_test_type = all_memory_test_type.pop()
     if(memory_test_type == "distractor"){
         memory_test_stimulus = all_distractors.pop()
     }else{
        
             memory_test_stimulus = background_stimulus
         
     }


       
        // set up the deviant block 
        background_block_info = {
            block_type: "background_block", 
            background_stimulus: background_stimulus, 
            deviant_stimulus: deviant_stimulus,
            exposure_duration:all_background_exposure_duration[b_id], 
            memory_test_type: memory_test_type, 
            memory_test_stimulus: memory_test_stimulus
        }

        all_blocks_info.push(background_block_info)

    }







    

    
    
    return (all_blocks_info)

}








