
function test_stimuli(all_blocks_info){

    all_background = []
    all_deviant = []
    all_exposure_duration = []
    all_deviant_exposure_duration = []


    all_deviant_blocks = all_blocks_info.filter(item => item.block_type == "deviant_block")

    all_blocks_info.forEach((block_info, block_index) => {
        
        all_background.push(block_info.background_stimulus)
        all_deviant.push(block_info.deviant_stimulus)
        all_exposure_duration.push(block_info.exposure_duration)
    });

    all_deviant_blocks.forEach((block_info, block_index) => {
        all_deviant_exposure_duration.push(block_info.exposure_duration)
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

    console.log("checking using the correct number of unique stimuli (25):", new Set(reduced_all_stimuli_used).size == 25)


    // check if there are 2 of each exposure duration in the deviant blocks

    counter = {};
    all_deviant_exposure_duration.forEach(ele => {
        if (counter[ele]){
            counter[ele] += 1
        }else {
            counter[ele] = 1
        }
    })

    for (var key in counter){
        exp_duration_count = counter[key]
        console.log("checking all exposure duration occurs 2 times", exp_duration_count == 2)
    }


    // check if there is one exposure duration in each exposure duration level 

    exposure_duration_a  = [1, 2]
    exposure_duration_b  = [3, 4]
    exposure_duration_c = [5, 6]
    exposure_duration_d = [7, 8]
    exposure_duration_e = [9, 10]

    all_exposure_duration_level = [exposure_duration_a, exposure_duration_b, exposure_duration_c, exposure_duration_d, exposure_duration_e]
    all_deviant_exposure_duration.sort()
    all_deviant_exposure_duration = [...new Set(all_deviant_exposure_duration)]
    all_deviant_exposure_duration.sort()


    console.log("five exposure duration levels:", all_exposure_duration_level.length == all_deviant_exposure_duration.length)  
    for (var i = 0; i < all_exposure_duration_level.length; i++){
        //console.log(all_exposure_duration_level)
        //console.log(all_deviant_exposure_duration)
        //console.log("includes the level:", all_exposure_duration_level[i].includes(all_deviant_exposure_duration[i]))
    }



    // check if there are correct number of distractors and appeared test function 
    distractor_block =  all_blocks_info.filter(item => item.memory_test_type == "distractor")
    non_distractor_block =  all_blocks_info.filter(item => item.memory_test_type != "distractor")

   
    console.log(
        "distractor blocks are 8:", distractor_block.length == 7,
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


