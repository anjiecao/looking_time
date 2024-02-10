
function test_stimuli_repeating(all_blocks_info){

    all_background = []
    all_deviant = []
    all_blocks_info.forEach((block_info, block_index) => {
        
        all_background.push(block_info.background_stimulus)
        all_deviant.push(block_info.deviant_stimulus)
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

    // check if the repeating stimuli come from the right violation 
    var toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)
    var duplicateElementa = toFindDuplicates(reduced_all_stimuli_used);
    
    duplicates_in_blocks = []
    all_blocks_info.forEach((block_info, block_index) => {
        if (block_info.violation_type == "pose"){
            duplicates_in_blocks.push(block_info.background_stimulus)
        }else if(block_info.violation_type == "number"){
            duplicates_in_blocks.push(block_info.background_stimulus)
        }
    });

    var reduced_duplicates_stimuli = duplicates_in_blocks.map(item => {
        // Split the string by '/', take the last part, then split by '.', and take the first part
        const parts = item.split('/');
        const filename = parts[parts.length - 1].split('.')[0];
    
        // Now extract the part before '_left' or '_right'
        return filename.split('_left')[0].split('_right')[0];
        });



    console.log("checking if the duplicating stimuli come from the correct categories:", duplicateElementa.sort().join(',')=== reduced_duplicates_stimuli.sort().join(','))
    



    // check if there are exactly 4 of each violation

    all_identity_blocks = all_blocks_info.filter(item => item.violation_type == "identity")
    all_animacy_blocks = all_blocks_info.filter(item => item.violation_type == "animacy")
    all_number_blocks = all_blocks_info.filter(item => item.violation_type == "number")
    all_pose_blocks = all_blocks_info.filter(item => item.violation_type == "pose")

    console.log("4 identity violation:", all_identity_blocks.length == 4)
    console.log("4 animacy violation:", all_animacy_blocks.length == 4)
    console.log("4 number violation:", all_number_blocks.length == 4)
    console.log("4 pose violation:", all_pose_blocks.length == 4)

    // check the ordering of the blocks to see if it follows the design 

    for (var i in [0, 1, 2, 3]){
        slice_start = i * 6
        slice_end = slice_start + 6


        group = all_blocks_info.slice(slice_start, slice_end)
        group_identity_blocks = group.filter(item => item.violation_type == "identity")
        group_animacy_blocks = group.filter(item => item.violation_type == "animacy")
        group_number_blocks = group.filter(item => item.violation_type == "number")
        group_pose_blocks = group.filter(item => item.violation_type == "pose")


        console.log("1 identity violation per group:", group_identity_blocks.length == 1)
        console.log("1 animacy violation per group:", group_animacy_blocks.length == 1)
        console.log("1 number violation per group:", group_number_blocks.length == 1)
        console.log("1 pose violation per group:", group_pose_blocks.length == 1)

    }

    // check if there are 12 distractors and 12 non-distractors blocks 

    distractor_block =  all_blocks_info.filter(item => item.memory_test_type == "distractor")
    non_distractor_block =  all_blocks_info.filter(item => item.memory_test_type != "distractor")

   
    console.log(
        "distractor blocks are 12:", distractor_block.length == 12,
        "non-distractor blocks are 12:", non_distractor_block.length == 12
     )

}



function check_violation_type(all_blocks_info){

    background_counter = 0
    deviant_counter = 0
    // check there are eight blocks 
    all_blocks_info.forEach((block) => {

    

        if (block.block_type == "deviant_block"){
            deviant_counter = deviant_counter + 1

            //get all the information
            block_background_animacy = block.background_stimulus.includes("inanimate") ? "inanimate" : "animate"
            block_background_id = block.background_stimulus.match(/\d+/g)[0];
            block_background_pose = block.background_stimulus.includes("left") ? "left" : "right"

            block_deviant_animacy = block.deviant_stimulus.includes("inanimate") ? "inanimate" : "animate"
            block_deviant_id =  block.deviant_stimulus.match(/\d+/g)[0]
            block_deviant_pose = block.deviant_stimulus.includes("left") ? "left" : "right"

            
            // check violation type 
            if (block.violation_type == "identity"){
                // if identity, the difference should only be the number
                console.log(
                    "pass identity check:", 
                    (block_background_animacy == block_deviant_animacy) & (block_background_pose == block_deviant_pose) & (block_background_id != block_deviant_id)
                )
               
            }else if(block.violation_type == "animacy"){
                console.log(
                    "pass animacy check:", 
                    (block_background_animacy != block_deviant_animacy) & (block_background_pose == block_deviant_pose)
                )

            }else if(block.violation_type == "pose"){
                console.log(
                    "pass pose check:", 
                    (block_background_animacy == block_deviant_animacy)  & (block_background_pose != block_deviant_pose) & (block_background_id == block_deviant_id)
                )

            }else if(block.violation_type == "number"){
                console.log(
                    "pass number check:", 
                    (block_background_animacy == block_deviant_animacy)  & (block_background_pose == block_deviant_pose) & (block_background_id == block_deviant_id)
                )
            }



        }else{
            background_counter = background_counter + 1
        }

      

      
        
    });

    console.log("8 background blocks:", background_counter == 8)
    console.log("16 deviant blocks:", deviant_counter == 16 )


}

