function checking_block_information(all_blocks_information, 
                                    block_number, 
                                    num_trial_per_block, 
                                    show_similar, 
                                    show_simple){


    // check the block number is as promised 
    if (all_blocks_information.length != block_number){
        throw "The number of blocks is not consistent with the setting"
    }

    used_stimuli = []
    used_new_memory_probe = []
   

    for (var i = 0; i < block_number; i++){

        current_block = all_blocks_information[i]

        current_block_length = current_block.num_trial_per_block[0]
        current_block_type = current_block.block_type
        current_background = current_block.background_stimuli 
        current_deviant = current_block.deviant_stimuli 
        current_memory_stimuli = current_block.memory_test_stimuli 
        
        background_specie_info =  current_background.slice(current_background.length-10, current_background.length-8)
        deviant_specie_info =  current_deviant.slice(current_deviant.length-10, current_deviant.length-8)

        // check the trial number 
        if (!(num_trial_per_block.includes(current_block_length))){
            throw "the number of trials in the block is not consistent with the setting" 
        }

         // check show similar and show simple is as promised 
         if (current_block_type == "complex_similar"){
            if (!show_similar){
                throw "similar block is present when the setting does not allow"
            }
         }else if (current_block_type == "simple_similar"){
            if (!show_similar){
                throw "similar block is present when the setting does not allow" 
            }
            if (!show_simple){
                throw "simple block is present when the setting does not allow" 
            }
         }else if(current_block_type == "simple_dissimilar"){
            if (!show_simple){
                throw "simple block is present when the setting does not allow" 
            }
         }

        // to check no duplicates stimuli in the blocks, put all the stimuli in the array 
         used_stimuli.push(background_specie_info)
         used_stimuli.push(deviant_specie_info)
         

         // check if one of the memory probe appears in the stimuli 
         if (!(current_memory_stimuli.includes(current_background) | 
              current_memory_stimuli.includes(current_deviant))){
                throw "memory probe does not contain current background or current deviant"
              }

        // push the novel memory probe 
        for (var j = 0; j < current_memory_stimuli.length; j++){
            if (current_memory_stimuli[j] != current_background && 
                current_memory_stimuli[j] != current_deviant){
                    novel_memory_probe = current_memory_stimuli[j]
                    novel_memory_probe_specie_info = novel_memory_probe.slice(novel_memory_probe.length-10, 
                                                                             novel_memory_probe.length-8)
                    used_new_memory_probe.push(novel_memory_probe_specie_info)
                }
        }  

    }
    console.log("novel memory test probe:")
    console.log(used_new_memory_probe)
    console.log("background and deviant species: ")
    console.log(used_stimuli)
    
    // check if the novel memory probes have not appeared in other places 
    if (findCommonElement(used_new_memory_probe, used_stimuli)){
        throw "the novel memory probes have overlap with the stimuli used"
    }
    // check if neither novel memory probes nor the used stimuli have duplicate stimuli 
    if (hasDuplicates(used_new_memory_probe)){
        throw "the used new memory probe has duplicates"
    }

    if(hasDuplicates(used_stimuli)){
       throw "the stimuli have duplicates"
    }


    console.log("Passed all tests! congrats!")









}
