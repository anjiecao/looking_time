
function test_stimuli(all_blocks_info){

    all_background = []
    all_deviant = []
    all_exposure_duration = []
    all_blocks_info.forEach((block_info, block_index) => {
        
        all_background.push(block_info.background_stimulus)
        all_deviant.push(block_info.deviant_stimulus)
        all_exposure_duration.push(block_info.exposure_duration)
    });

    // check if any stimuli are duplicates 
    all_stimuli_used = all_background.concat(all_deviant)
    all_stimuli_used = all_stimuli_used.filter(element => element !== null);
    // reduce the all stimuli array to only contain information about the animacy and identity 
    var reduced_all_stimuli_used = all_stimuli_used.map(item => {
        // Split the string by '/', take the last part, then split by '.', and take the first part
        const parts = item.split('/');
        const filename = parts[parts.length - 1].split('.')[0];
    
        // Now extract the part before '_left' or '_right'
        return filename.split('_left')[0].split('_right')[0];
        });

    console.log("checking using the correct number of unique stimuli (32):", new Set(reduced_all_stimuli_used).size == 32)


    // check if there are 4 of each exposure duration 

    counter = {};
    all_exposure_duration.forEach(ele => {
        if (counter[ele]){
            counter[ele] += 1
        }else {
            counter[ele] = 1
        }
    })

    for (var key in counter){
        exp_duration_count = counter[key]
        console.log("checking all exposure duration occurs 4 times", exp_duration_count == 4)
    }


    // check if there is one exposure duration in each exposure duration level 

    exposure_duration_a  = [0, 1]
    exposure_duration_b  = [2, 3]
    exposure_duration_c = [4, 6]
    exposure_duration_d = [8, 9]

    all_exposure_duration_level = [exposure_duration_a, exposure_duration_b, exposure_duration_c, exposure_duration_d]
    all_exposure_duration.sort()
    all_exposure_duration = [...new Set(all_exposure_duration)]
    console.log(all_exposure_duration)

    console.log("four exposure duration levels:", all_exposure_duration_level.length == all_exposure_duration.length)  
    for (var i = 0; i < all_exposure_duration_level.length; i++){
        console.log("includes the level:", all_exposure_duration_level[i].includes(all_exposure_duration[i]))
    }



    // check the group ordering is correct 

    for (var i in [0, 1, 2, 3]){
        slice_start = i * 4
        slice_end = slice_start + 4


        group = all_blocks_info.slice(slice_start, slice_end)
        group_exposure_duration_a = group.filter(item => exposure_duration_a.includes(item.exposure_duration))
        group_exposure_duration_b = group.filter(item => exposure_duration_b.includes(item.exposure_duration))
        group_exposure_duration_c = group.filter(item => exposure_duration_c.includes(item.exposure_duration))
        group_exposure_duration_d = group.filter(item => exposure_duration_d.includes(item.exposure_duration))

        console.log("1 exposure duration length a per group:", group_exposure_duration_a.length == 1)
        console.log("1 exposure duration length b per group:", group_exposure_duration_b.length == 1)
        console.log("1 exposure duration length c per group", group_exposure_duration_c.length == 1)
        console.log("1 exposure duration length d per group", group_exposure_duration_d.length == 1)

    }


    // check if there are correct number of distractors and appeared test function 
    distractor_block =  all_blocks_info.filter(item => item.memory_test_type == "distractor")
    non_distractor_block =  all_blocks_info.filter(item => item.memory_test_type != "distractor")

   
    console.log(
        "distractor blocks are 8:", distractor_block.length == 8,
        "non-distractor blocks are 8:", non_distractor_block.length == 8
     )


    // check in the distractor case the stimulus has not been seen, and in the appeared it has been seen

    for (var distractor_id in distractor_block){
        distractor = distractor_block[distractor_id]
        not_seen = (distractor.memory_test_stimulus != distractor.background_stimulus) && (distractor.memory_test_stimulus != distractor.deviant_stimulus)
        console.log("in distractor blocks, memory stimulus not seen: ", not_seen)
    }

    for (var non_distractor_id in non_distractor_block){
        non_distractor = non_distractor_block[non_distractor_id]
        stimuli_in_non_distractor = [non_distractor.background_stimulus, non_distractor.deviant_stimulus]
        console.log("in non-distractor blocks, memory stimulus seen: ", stimuli_in_non_distractor.includes(non_distractor.memory_test_stimulus))
    }




    


    

}


