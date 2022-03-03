function checking_block_information(all_blocks_information, 
                                    block_number, 
                                    num_trial_per_block, 
                                    deviant_positions, 
                                    forced_lengths){


    // check the block number is as promised 
    if (all_blocks_information.length != block_number){
        throw "The number of blocks is not consistent with the setting"
    }

    forced_short_length = Math.min(...forced_lengths)
    forced_long_length = Math.max(...forced_lengths)

    forced_short_block_num = 0
    forced_long_block_num = 0


    used_stimuli = []
    used_novel_stimuli = []

    

    all_deviant_positions = []

    for (var i = 0; i < block_number; i++){

        current_block = all_blocks_information[i]
        current_block_length = current_block.num_trial_per_block[0]
        current_block_type = current_block.block_type
        current_background = current_block.background_stimuli 
        current_deviant = current_block.deviant_stimuli 
        current_task_info = current_block.task_information
        current_block_forced_length = current_block.forced_exposure_length
        
        current_deviant_position = current_block.deviant_position[0]
        all_deviant_positions.push(current_deviant_position)

        current_trial_per_block = current_block.num_trial_per_block[0]
    
        if (current_block_forced_length == forced_short_length){
            forced_short_block_num += 1
        } else if (current_block_forced_length == forced_long_length){
            forced_long_block_num += 1
        }

        used_stimuli.push(current_background)
        used_stimuli.push(current_deviant)

        if (current_task_info.task_type != "math"){
            novel_item = current_task_info.presenting_item
           
            used_novel_stimuli.push(novel_item)
        }

        if (current_trial_per_block != num_trial_per_block){
            throw "current trial per block does not match the setting"
        }
    }

    // check we have 4 simple 4 complex 
    if (forced_short_block_num != forced_long_block_num | forced_long_block_num != (block_number / 2) | forced_short_block_num != (block_number /2)){
        throw "block number problems (# of forced short & # of forced long)"
    }

    console.log("novel memory test probe:")
    console.log(used_novel_stimuli)
    console.log("background and deviant species: ")
    console.log(used_stimuli)
    console.log("all deviant positions")
    console.log(all_deviant_positions)

  
    // check if neither novel memory probes nor the used stimuli have duplicate stimuli 
    if (hasDuplicates(used_novel_stimuli)){
        throw "the used new memory probe has duplicates"
    }

    if(hasDuplicates(used_stimuli)){
       throw "the stimuli have duplicates"
    }




    console.log("Passed all tests! congrats!")









}
