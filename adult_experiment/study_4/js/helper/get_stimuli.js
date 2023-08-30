// get paths for all stimuli


function get_all_stimuli(unique_pair = true){
    all_stimuli = []
    pair_ids = ["1", "2"]
    pose_level = ["left", "right"]


    TOTAL_STIM_EACH_LEVEL = 6
    MAIN_DIR = "media/animal_stim/whitened/"
    if (unique_pair){
        for (var i = 1; i < TOTAL_STIM_EACH_LEVEL + 1; i++){
            for (var pair_id = 0; pair_id < pair_ids.length; pair_id++){
                  if (i < 10){
                      i_string = "00" + i
                  } else{
                      i_string = "0" + i
                  }

                  pose = getRandomSubarray(pose_level, 1)[0]

                  current_stimuli_path = MAIN_DIR + i_string + "_" + pose +  '_' + pair_ids[pair_id] + ".gif"
                  all_stimuli.push(current_stimuli_path)
    
              }
  
            }
    }else {

    for (var i = 1; i < TOTAL_STIM_EACH_LEVEL + 1; i++){
        for (var pose_index = 0; pose_index < pose_level.length; pose_index++){
          for (var pair_id = 0; pair_id < pair_ids.length; pair_id++){
              if (i < 10){
                  i_string = "00" + i
              } else{
                  i_string = "0" + i
              }
              current_stimuli_path = MAIN_DIR + i_string + "_" + pose_level[pose_index] +  '_' + pair_ids[pair_id] + ".gif"
              all_stimuli.push(current_stimuli_path)
  
          }
          
  
          }
          
        }
    }


      return(all_stimuli)

}

all_stimuli = get_all_stimuli()
console.log(all_stimuli)



function get_block_information(all_stimuli, fam_trial_params = [1, 3, 9]){

    all_block_info = []
    block_type = ["all_background", "deviant"]

    // grab each pair in an object things 
    // each of the pair is now in a subarray 
    all_pairs = packNeighboringElements(all_stimuli)
    console.log(all_pairs)
    for (var i = 0; i < all_pairs.length; i++){
        pair = all_pairs[i]
        shuffleArray(pair)
        block_info = {
            background: pair[0], 
            deviant: pair[1]
        }
        all_block_info.push(block_info)

    }

    shuffleArray(all_block_info)

    for (var pair_type_index = 0; pair_type_index < block_type.length; pair_type_index++){
        for (var fam_trial_index = 0; fam_trial_index < fam_trial_params.length; fam_trial_index++){
            // 0, 0 // 0, 1 // 0, 2 // 1, 0 // 1, 1 // 1, 2
            // 0    // 1    // 2    // 3    // 4   // 5 
            
            block_index = pair_type_index * 3 + fam_trial_index
            all_block_info[block_index].block_type = block_type[pair_type_index]
            all_block_info[block_index].fam_trial = fam_trial_params[fam_trial_index]


        }
    }


    return all_block_info





}




