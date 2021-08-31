
function get_all_stimuli(NUM_COMPLEX_CREATURES, NUM_SIMPLE_CREATURES){


    all_stimuli = []
    MAIN_DIR = "images/stimuli/"
    
    COMPLEX_DIR = MAIN_DIR + "complex_"
    SIMPLE_DIR = MAIN_DIR + "simple_"

    VERSION = ['A']
    ACTION = ['a']

    for (var i = 0; i < NUM_COMPLEX_CREATURES; i++){
      for (var k = 0; k < VERSION.length; k++){
        for (var l = 0; l < ACTION.length; l++){
          if (i < 9){
            index = "0" + (i+1)
          }else{
            index = i+1
          }

          current_complex_creature = COMPLEX_DIR + index +  '_'
                                          + VERSION[k] + '_'
                                          + ACTION[l]
                                          + ".gif"

        }
      }
      all_stimuli.push(current_complex_creature) 
    }

    for (var i = 0; i < NUM_SIMPLE_CREATURES; i++){
      for (var k = 0; k < VERSION.length; k++){
        for (var l = 0; l < ACTION.length; l++){

          if (i < 9){
            index = "0" + (i+1)
          }else{
            index = i+1
          }

          current_simple_creature = SIMPLE_DIR + index +  '_'
                                          + VERSION[k] + '_'
                                          + ACTION[l]
                                          + ".gif"

        }
      }
      all_stimuli.push(current_simple_creature) 
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
                            task_type, 
                            show_simple){


    // first, sort out all simple stimuli and complex stimuli
    all_block_information = []
    simple_stimuli = stimuli_array.filter(stimulus => stimulus.includes("simple"))
    complex_stimuli = stimuli_array.filter(stimulus => stimulus.includes("complex"))

    if (show_simple){
      loop_length = num_blocks / 2
    }else{
      loop_length = num_blocks 
    }


    // for simple dissimilar 
    for (i = 0; i < loop_length; i++){
      
      if (i < all_deviant_position_array.length){
        deviant_position = all_deviant_position_array[i]
        num_deviants = num_deviants
      }else{
        deviant_position = null
        num_deviants = [0]
      }
    
      if (show_simple){
        output = generate_basic_dissimilar_block(simple_stimuli, 
                                           num_trial_per_block, 
                                           [deviant_position], 
                                           num_deviants,  
                                           block_type = 'simple_dissimilar' 
                                           )
  
        simple_stimuli = output[0]
        basic_block_information = output[1]
        // add task info
        output = get_task_info(basic_block_information, simple_stimuli, task_type)
        simple_stimuli = output[0]
        block_information = output[1]
        all_block_information.push(block_information)
      }
  
      output = generate_basic_dissimilar_block(complex_stimuli, 
                                         num_trial_per_block, 
                                         [deviant_position], 
                                         num_deviants, 
                                         block_type = 'complex_dissimilar'
                                         )
  
      complex_stimuli = output[0]
      basic_block_information = output[1]
      
      output = get_task_info(basic_block_information, complex_stimuli, task_type)
      complex_stimuli = output[0]
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
  speciesInfo_1 = background.slice(background.length-10, background.length-8)
 
  // remove these creatures from the list for next iteration (not including their modification)
 
  stims = stims.filter(x => !(x.includes(speciesInfo_1)))

  // choose random index to get deviant stim
  
  var randomIdx = Math.floor(Math.random() * stims.length)
  var deviant = stims[randomIdx]
  // get relevant info about deviant to exclude that species
  speciesInfo_2 = deviant.slice(deviant.length-10, deviant.length-8)
  stims = stims.filter(x => !(x.includes(speciesInfo_2)))

  

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


