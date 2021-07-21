
function get_all_stimuli(TEST_RUN, SPECIES_NUM, SHOW_SIMILAR, SHOW_SIMPLE){


    all_stimuli = []
    MAIN_DIR = "images/stimuli/"

    // 2 complexity levels
    if (SHOW_SIMPLE){
        complexity_levels = ['simple', 'complex']
    }else{
        complexity_levels = ['complex']
    }
    

    if (TEST_RUN == 1) {
      // 30 species
      species = Array.from({length: SPECIES_NUM}, (_, i) => i + 1)

      // 2 versions per species
      version = ['A']

      // 2 actions per creature
      action = ['a', 'b']
    }
    else {
      // 20 species
      species = Array.from({length: SPECIES_NUM}, (_, i) => i + 1)

      // 2 versions per species
      version = ['A']

      // 2 actions/rotations per creature
      action = ['a', 'b']
    }


    // set number is specified in experiment.html
    for (var i = 0; i < complexity_levels.length; i++){
        for (var j = 0; j < species.length; j++){

          // add 0's before number for species number less than 0
          if (species[j] < 10) {
            current_species = '0' + species[j]
          }
          else {
            current_species = species[j]
          }

          for (var k = 0; k < version.length; k++){

            for (var l = 0; l < action.length; l++){

              if (complexity_levels[i] == 'simple' || complexity_levels[i] == 'complex') {
                current_stimuli = MAIN_DIR + complexity_levels[i] + '_'
                                            + current_species + '_'
                                            + version[k] + '_'
                                            + action[l]
                                             + ".gif"

             all_stimuli.push(current_stimuli)
                       }
          }
          }
        }
      }
    return (all_stimuli)

}

function generate_timeline_variables(block_information){

    background_stimuli = block_information.background_stimuli
    deviant_stimuli = block_information.deviant_stimuli
    deviant_position_array = block_information.deviant_position_array
    block_length = block_information.num_trial_per_block
    block_type = block_information.block_type
    exposure_type = block_information.exposure_type


    block_stimuli = []
    
    // because some copy-making issue, somewhat hacky solution
    // the first trial is always background 
    
    var first_trial = {
         stimuli: background_stimuli,
         stim_type: 'background', 
         exposure_type: exposure_type, 
         first_trial: true
     }
    block_stimuli.push(first_trial)
    for (var i = 0; i < block_length-1; i++){
        
        var background_item = {
         stimuli: background_stimuli,
         stim_type: 'background', 
         exposure_type: exposure_type, 
         first_trial: false
        }
        
        
        
        block_stimuli.push(background_item)
        
        
    }

     

    
    // replace background with deviant
    for (var i = 0; i < deviant_position_array.length; i++){
         var deviant_item = {
         stimuli: deviant_stimuli,
         stim_type: 'deviant', 
         exposure_type: exposure_type, 
         first_trial: false
            }
        deviant_position = deviant_position_array[i]
        block_stimuli[deviant_position] = deviant_item
    }
    


    return (block_stimuli)
    //return (block_stimuli)

}



function generate_all_block(num_blocks,
                            num_trial_per_block,
                            stimuli_array,
                            all_deviant_position_array,
                            num_deviants,
                            num_species,
                            show_similar, 
                            show_simple){

    // check that number of blocks is divisible by 4
    if (num_blocks % 4 != 0){
      throw 'Number of blocks should be divisible by 4, to have equal number of each block type';
    }
    
    /*
    if (num_blocks % 6 != 0){
      throw 'Number of blocks should be divisible by 6, to have equal number of each block type (simple, complex vs 3 variation of trial length)';
    }
    */

    // check that there's no deviant position larger than the total number of trials per block
    if (all_deviant_position_array.some(el => el > num_trial_per_block)){
      throw 'Can not have deviant position larger than number of trials per block';
    }

    // get paths to all simple stimuli
    if (show_simple){
      simple_stims = []
      for (var i = 0; i < stimuli_array.length; i++) {
        if (stimuli_array[i].includes('simple')) {
          simple_stims.push(stimuli_array[i])
        }
      }
    }

    // get paths to all complex stimuli
    complex_stims = []
    for (var i = 0; i < stimuli_array.length; i++) {
      if (stimuli_array[i].includes('complex')) {
        complex_stims.push(stimuli_array[i])
      }
    }

    all_block_information = []



    if (show_similar && show_simple)
    {
      loop_length = num_blocks/4
    }
    else if (show_simple | show_similar){
      loop_length = num_blocks/2
    } else{
      loop_length = num_blocks
    }

if (show_similar) {

  // SIMILAR BLOCKS
  // put a loop around this with the number of blocks of this type
  for (i = 0; i < loop_length; i++) {

  // simple similar blocks
      
      if(show_simple){
   output = generate_similar_block(simple_stims, num_blocks, num_trial_per_block, all_deviant_position_array, num_deviants, num_species, block_type = 'simple_similar')

   simple_stims = output[0]
   block_information = output[1]


   all_block_information.push(block_information)
          

      }
      
   // complex similar blocks
  output = generate_similar_block(complex_stims, num_blocks, num_trial_per_block, all_deviant_position_array, num_deviants, num_species, block_type = 'complex_similar')

  complex_stims = output[0]
  block_information = output[1]

  all_block_information.push(block_information)
  }
}


// DISSIMILAR BLOCKS

// put a loop around this with the number of blocks of this type
for (i = 0; i < loop_length; i++) {

  // simple dissimilar blocks
 if (show_simple){
  output = generate_dissimilar_block(simple_stims, num_blocks, num_trial_per_block, all_deviant_position_array, num_deviants,  block_type = 'simple_dissimilar')

 simple_stims = output[0]
 block_information = output[1]

 all_block_information.push(block_information)
}
 // complex dissimilar blocks
 output = generate_dissimilar_block(complex_stims, num_blocks, num_trial_per_block, all_deviant_position_array, num_deviants, block_type = 'complex_dissimilar')

complex_stims = output[0]
block_information = output[1]

all_block_information.push(block_information)
  }

    //  each block type has 3 exposure types 
    
    var num_block_each_exposure_type = loop_length
    
    // will be replaced by non-hardcoded version 
  //  var forced_long_arr = fillArray("forced_long", 
    //                           num_block_each_exposure_type)
    var forced_short_arr = fillArray("forced_short", 
                               num_block_each_exposure_type)
    //var self_paced_arr = fillArray("self_paced", 
      //                         num_block_each_exposure_type)
    
    
    var exposure_type = forced_short_arr
    
    if (show_simple){
        
        var simple_dissimilar_blocks =  all_block_information.filter(x => x.block_type == "simple_dissimilar") 
        shuffleArray(simple_dissimilar_blocks)
    }
 

    var complex_dissimilar_blocks = all_block_information.filter(x => x.block_type == "complex_dissimilar") 
    
    // first shuffle these two block types
    shuffleArray(complex_dissimilar_blocks)
     
    
    for (i = 0; i < loop_length; i++){
        
        
        // add the exposure type 
        if(show_simple){
            var current_sd = simple_dissimilar_blocks[i]
            current_sd.exposure_type = exposure_type[i]

        }
        var current_cd = complex_dissimilar_blocks[i]
        
        current_cd.exposure_type = exposure_type[i]

    }
    
    
    
    

    // shuffle blocks
    shuffleArray(all_block_information)

    

    return (all_block_information)

}

function generate_similar_block(stims, num_blocks, num_trial_per_block, all_deviant_position_array, num_deviants, num_species, block_type){

  // get paths of species that are complete (i.e. have both modifications)
  sampleFrom = complete_species_paths(stims, num_species)

  // choose random creature as background
  var randomIdx = Math.floor(Math.random() * sampleFrom.length)
  var background = sampleFrom[randomIdx];


  // choose its modification
  if (background.includes('A')){
    deviant = background.replace('A', 'B')

  }
  else {
    if (background.includes('B')){
      deviant = background.replace('B', 'A')
    }
  }

  // get species info
  speciesInfo = background.slice(0, background.length-7)

  // remove that species from pool
  stims = stims.filter(x => !(x.includes(speciesInfo)))

  // get random trial number
  num_trial_per_block = getRandomSubarray(num_trial_per_block, 1)

  // random number of deviants
  num_deviants = getRandomSubarray(num_deviants, 1)

  // make all deviant position array smaller such that it doesn't exceed the block length
  all_deviant_position_array = all_deviant_position_array.filter(function(item) {return item <= num_trial_per_block});


  // get the position in which deviant trial appears
  deviant_position_array = getRandomSubarray(all_deviant_position_array, num_deviants)


  // generate random math question

    first_addend = Math.floor(Math.random() * 9) + 1;

    second_addend = Math.floor(Math.random() * 9) + 1;

    result = first_addend + second_addend;

    offset_array = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]

    shuffleArray(offset_array)

    // pop off to make sure offset2 is different from offset1
    offset1 = offset_array.pop()

    offset2 = offset_array.pop()

    var option1 = parseFloat(result) + parseFloat(offset1)

    var option2 = parseFloat(result) + parseFloat(offset2)

    options = [result, option1, option2]

    shuffleArray(options)

      block_information = {
          num_trial_per_block: num_trial_per_block,
          background_stimuli: background,
          deviant_stimuli: deviant,
          deviant_position_array: deviant_position_array,
          block_type: block_type,
          first_addend: first_addend,
          second_addend: second_addend,
          result: result,
          options: options

      }


return ([stims, block_information])
}

function generate_dissimilar_block(stims, num_blocks, num_trial_per_block, all_deviant_position_array, num_deviants, block_type){

  // generate dissimilar blocks:
  // -> get random creature,
  // and choose another creature that differs in species and movement

  // choose random creature as background
  var randomIdx = Math.floor(Math.random() * stims.length)
  var background = stims[randomIdx];

  //console.log('stims')
  // console.log(stims)

  //console.log('background')
  //console.log(background)

  // and get info about species, modification, movement/rotation
  speciesInfo_1 = background.slice(background.length-10, background.length-8)
  //modificationInfo_1 = background.slice(background.length-7, background.length-6)
  //movementInfo_1 = background.slice(background.length-5, background.length-1)

  //console.log(speciesInfo_1)
  //console.log(modificationInfo_1)
  //console.log(movementInfo_1)
 // console.log('stims0:')
  //console.log(stims)

  // remove these creatures from the list for next iteration (not including their modification)
  //stims.splice(randomIdx, 1)
 
  stims = stims.filter(x => !(x.includes(speciesInfo_1)))

  //console.log('stims:')
  //console.log(stims)

  // stimuli to sample from, which don't come from the same species or movement

  // console.log('stims2:')
  // console.log(stims)

  //console.log('sampleFrom:')
  //console.log(sampleFrom)

  // choose random index to get deviant stim
  
  var randomIdx = Math.floor(Math.random() * stims.length)
  var deviant = stims[randomIdx]

  // get relevant info about deviant to exclude that species
  speciesInfo_2 = deviant.slice(deviant.length-10, deviant.length-8)
  //modificationInfo_2 = deviant.slice(deviant.length-7, deviant.length-6)
  //movementInfo_2 = deviant.slice(background.length-5, background.length-1)
  //
  // console.log('stims3:')
  // console.log(stims)


  // remove these creatures from the list for next iteration (not including their modification)
  //stims.splice(randomIdx, 1)

  // console.log('stims4:')
  // console.log(stims)

  stims = stims.filter(x => !(x.includes(speciesInfo_2)))

  // get random trial number
  num_trial_per_block = getRandomSubarray(num_trial_per_block, 1)

  // random number of deviants
  num_deviants = getRandomSubarray(num_deviants, 1)

  // make all deviant position array smaller such that it doesn't exceed the block length
  all_deviant_position_array = all_deviant_position_array.filter(function(item) {return item <= num_trial_per_block});

  // get the position in which deviant trial appears
  deviant_position_array = getRandomSubarray(all_deviant_position_array, num_deviants)

  // generate random math question

    first_addend = Math.floor(Math.random() * 9) + 1;

    second_addend = Math.floor(Math.random() * 9) + 1;

    result = first_addend + second_addend;

    offset_array = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]

    shuffleArray(offset_array)

    // pop off to make sure offset2 is different from offset1
    offset1 = offset_array.pop()

    offset2 = offset_array.pop()

    //console.log('offset1:')
    //console.log(offset1)
    //console.log('offset2:')
    //console.log(offset2)

    var option1 = parseFloat(result) + parseFloat(offset1)

    var option2 = parseFloat(result) + parseFloat(offset2)

    options = [result, option1, option2]

    //console.log(result)
    //console.log(options)

    shuffleArray(options)

    
    // get stimuli for the memory test purpose 
    // one stimulus will be the actual stimulus that we use, randomly selected from background or deviant 
    // the other stimulus will be selected from a pool of stimulus that the participants have never seen before
    // ?: do we need the false stimulus to be very similar to the original one, or keep them very different? 

    if (deviant_position_array.length == 0){
      var true_stimulus = background
    }else{
      var true_stimulus = getRandomSubarray([background, deviant], 1)[0]
    }
    
    
    // current approach: selecting a completely different creature 
    var randomIdx = Math.floor(Math.random() * stims.length)
    var false_stimulus = stims[randomIdx]
    var speciesInfo_3 = false_stimulus.slice(false_stimulus.length-10, false_stimulus.length-8)
    stims = stims.filter(x => !(x.includes(speciesInfo_3)))


    var memory_test_stimuli = [true_stimulus, false_stimulus]
    
    shuffleArray(memory_test_stimuli)
    
      block_information = {
          num_trial_per_block: num_trial_per_block,
          background_stimuli: background,
          deviant_stimuli: deviant,
          deviant_position_array: deviant_position_array,
          block_type: block_type,
          first_addend: first_addend,
          second_addend: second_addend,
          result: result,
          options: options,
          memory_test_stimuli: memory_test_stimuli 

      }


return ([stims, block_information])
}


function complete_species_paths(stims, num_species){

  sampleFrom = []

 // make sure to only sample species of which both modificaitons are available in similar block
  for (i = 0; i < num_species; i++) {

   var speciesNum = i + 1
   // get all stimuli for a particular species
   speciesStimuli = stims.filter(x => x.includes(speciesNum))

   // initialize at false
   includes_A = false; includes_B = false;

// loop through each instance of the species and check if A and B are present
   for (j = 0; j < speciesStimuli.length; j++) {

     if (speciesStimuli[j].includes('A')) {

        var includes_A = true
     }
     else if (speciesStimuli[j].includes('B')) {

        var includes_B = true
     }
   }

// check whether this species has both it's A and B modifiers
 if (includes_A && includes_B) {

     // if both a and b are there, push to sampleFrom
     sampleFrom = sampleFrom.concat(speciesStimuli)
   }

 }

 return (sampleFrom)

}

