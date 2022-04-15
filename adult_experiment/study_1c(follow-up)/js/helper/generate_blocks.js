
function get_all_stimuli(SPECIES_NUM){


    all_stimuli = []
    MAIN_DIR = "images/stimuli/"
    
    
    for (i = 0; i < SPECIES_NUM; i++){
      index = i + 1
      if (index < 10){
        index = "0" + index
      }

      current_creature = MAIN_DIR + "unity_" + index + ".gif"
      all_stimuli.push(current_creature) 
    }
   
    return (all_stimuli)

}

function generate_timeline_variables(block_information){

    background_stimuli = block_information.background_stimuli
    deviant_stimuli = block_information.deviant_stimuli
    num_deviants = block_information.num_deviants
    deviant_position = block_information.deviant_position
    block_length = block_information.num_trial_per_block
    block_type = block_information.block_type

    block_stimuli = []
    
    
    for (var i = 0; i < block_length; i++){
        
        var background_item = {
         stimuli: background_stimuli,
         stim_type: 'background'
        }
      
        block_stimuli.push(background_item)
      
    }

    if (num_deviants[0] > 0){
      for (var i = 0; i < deviant_position.length; i++){
        var deviant_item = {
          stimuli: deviant_stimuli,
          stim_type: 'deviant'
           }
       deviant_position = deviant_position[i]
       block_stimuli[deviant_position] = deviant_item
    }
  }

  
    return (block_stimuli)
    //return (block_stimuli)

}



function generate_all_block(num_blocks,
                            num_trial_per_block,
                            stimuli_array,
                            all_deviant_position_array,
                            num_deviants, 
                            task_type){


    all_block_information = []
   
  
    for (i = 0; i < num_blocks; i++){
      
      if (i < all_deviant_position_array.length){
        deviant_position = all_deviant_position_array[i]
        num_deviants = num_deviants
      }else{
        deviant_position = null
        num_deviants = [0]
      }
    
      output = generate_basic_dissimilar_block(stimuli_array, 
                                           num_trial_per_block, 
                                           [deviant_position], 
                                           num_deviants,  
                                           block_type = 'unity' 
                                           )
  
        stimuli_array = output[0]
        basic_block_information = output[1]
        // add task info
        output = get_task_info(basic_block_information, stimuli_array, task_type)
        stimuli_array = output[0]
        block_information = output[1]
        all_block_information.push(block_information)
      
    }
    
  
    // shuffle blocks
    shuffleArray(all_block_information)

    return (all_block_information)

}


// no task yet 
function generate_basic_dissimilar_block(stims, 
                                  num_trial_per_block, deviant_position, num_deviants, block_type){

 

  // choose random creature as background
  console.log(stims)
  var randomIdx = Math.floor(Math.random() * stims.length)
  var background = stims[randomIdx];

  // and get info about species, modification, movement/rotation
  speciesInfo_1 = background.slice(background.length-6, background.length-4)
 
  // remove these creatures from the list for next iteration (not including their modification)
 
  stims = stims.filter(x => !(x.includes(speciesInfo_1)))

  // choose random index to get deviant stim

  console.log(deviant_position)

  if (deviant_position[0] != null){
    var randomIdx = Math.floor(Math.random() * stims.length)
    var deviant = stims[randomIdx]
  // get relevant info about deviant to exclude that species
   speciesInfo_2 = deviant.slice(deviant.length-6, deviant.length-4)
    stims = stims.filter(x => !(x.includes(speciesInfo_2)))
  }else{
    deviant = null
  }
  
  

  

  // random number of deviants
  num_deviants = getRandomSubarray(num_deviants, 1)

  // set up the 4 blocks per complexity type: 

    block_information = {
          num_trial_per_block: num_trial_per_block,
          background_stimuli: background,
          deviant_stimuli: deviant,
          deviant_position: deviant_position,
          num_deviants: num_deviants,
          block_type: block_type
    }
  

  



    return ([stims, block_information])



}


