
function get_all_stimuli(TEST_RUN, SPECIES_NUM, SHOW_SIMILAR, SHOW_SIMPLE, SHOW_COMPLEX){


    all_stimuli = []
    MAIN_DIR = "images/stimuli/"

    // 2 complexity levels
    console.log(SHOW_SIMPLE)
    console.log(SHOW_COMPLEX)
    if (SHOW_SIMPLE && SHOW_COMPLEX){
        complexity_levels = ['simple', 'complex']
    }else if (SHOW_COMPLEX == true & SHOW_SIMPLE == false){
        complexity_levels = ['complex']
    }else if (SHOW_SIMPLE == true & SHOW_COMPLEX == false){
      complexity_levels = ['simple']
    }else{
      console.log("buggy simplicity setting! neither simple nor complex.")
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
    

    for (var i = 0; i < block_length; i++){
        
        var background_item = {
         stimuli: background_stimuli,
         stim_type: 'background', 
         exposure_type: exposure_type
        }
        
        
        
        block_stimuli.push(background_item)
        
        
    }

     
    if (deviant_position_array[0] != null){

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
    }
    
  
    return (block_stimuli)
    //return (block_stimuli)

}



function generate_all_block(num_blocks,
                            num_trial_per_block,
                            stimuli_array,
                            all_deviant_position_array,
                            num_species,
                            show_similar, 
                            show_simple, 
                            show_complex){

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
    
    if (show_complex){
      // get paths to all complex stimuli
      complex_stims = []
      for (var i = 0; i < stimuli_array.length; i++) {
        if (stimuli_array[i].includes('complex')) {
          complex_stims.push(stimuli_array[i])
      }
      }
    }

    

    all_block_information = []



    if (show_similar && show_simple)
    {
      loop_length = num_blocks/4
    }
    else if ((show_simple | show_complex) && show_similar){
      loop_length = num_blocks/2
    } else {
      loop_length = num_blocks
    }



// DISSIMILAR BLOCKS

// put a loop around this with the number of blocks of this type

used_stimuli = []

// eight blocks: two no deviant, two w/ deviant at 2nd, two at 4th, two at 6th 


for (i = 0; i < loop_length; i++) {

  
current_deivant_position = all_deviant_position_array[i]


  // simple dissimilar blocks
 if (show_simple){
  output = generate_dissimilar_block(simple_stims, num_blocks, num_trial_per_block, current_deivant_position,   block_type = 'simple_dissimilar')

 simple_stims = output[0]
 block_information = output[1]

 all_block_information.push(block_information)

 used_stimuli.push([block_information.background_stimuli, block_information.deviant_stimuli])

}

if (show_complex){
  output = generate_dissimilar_block(complex_stims, num_blocks, num_trial_per_block, current_deivant_position,  block_type = 'complex_dissimilar')
  complex_stims = output[0]
  block_information = output[1]
  all_block_information.push(block_information)
  used_stimuli.push([block_information.background_stimuli, block_information.deviant_stimuli])
}
 // complex dissimilar blocks
 
}

left_over_stimuli = []
simple_left_over_stimuli = []
complex_left_over_stimuli = []
specie_action = ["a", "b"]

if (show_simple){
  simple_left_over_stimuli = left_over_stimuli.concat(simple_stims)
  simple_left_over_specie_info = simple_left_over_stimuli.map(x => x.slice(-10, x.length-8))
  simple_left_over_specie_info_unique = [...new Set(simple_left_over_specie_info)]
  for (i = 0; i < simple_left_over_specie_info_unique.length; i++){
    randomIdx = Math.floor(Math.random() * specie_action.length)
    specie = simple_left_over_specie_info_unique[i]
    action = specie_action[randomIdx]
    stimulus_path = "images/stimuli/simple_" + specie + "_A_" + action + ".gif"
    left_over_stimuli.push(stimulus_path)
  }

}
if(show_complex){
  complex_left_over_stimuli = left_over_stimuli.concat(complex_stims)
  complex_left_over_specie_info = complex_left_over_stimuli.map(x => x.slice(-10, x.length -8))
  complex_left_over_specie_info_unique = [... new Set(complex_left_over_specie_info)]
  for (i = 0; i < complex_left_over_specie_info_unique.length; i++){
    randomIdx = Math.floor(Math.random() * specie_action.length)
    specie = complex_left_over_specie_info_unique[i]
    action = specie_action[randomIdx]
    stimulus_path = "images/stimuli/complex_" + specie + "_A_" + action + ".gif"
    left_over_stimuli.push(stimulus_path)
  }
}


shuffleArray(left_over_stimuli)
// this is to make sure that the order was not disturbed 
all_block_index = range(0, loop_length-1)
block_index_with_false_memory = getRandomSubarray(all_block_index, loop_length/2)

for (i = 0; i < all_block_information.length; i++){
  real_used_stimuli = [all_block_information[i].background_stimuli]

  /* this is to only use background vs novel in the test so that kiddos don't get confused 
  if(all_block_information[i].deviant_position_array.length != 0){
    real_used_stimuli.push(all_block_information[i].deviant_stimuli)
  }
  shuffleArray(real_used_stimuli)
  */

  memory_test_stimuli = [left_over_stimuli[i], real_used_stimuli[0]]
  shuffleArray(real_used_stimuli)
  all_block_information[i].memory_test_stimuli = memory_test_stimuli
  all_block_information[i].memory_correct = real_used_stimuli[0]
  

  
}



    //  each block type has 3 exposure types 
    
    var num_block_each_exposure_type = loop_length
    
    // will be replaced by non-hardcoded version 
  //  var forced_long_arr = fillArray("forced_long", 
    //                           num_block_each_exposure_type)
    //var forced_short_arr = fillArray("forced_short", 
                            //   num_block_each_exposure_type)
    var self_paced_arr = fillArray("self_paced", 
                               num_block_each_exposure_type)
    
    
    var exposure_type = self_paced_arr
    
    if (show_simple){
        
        var simple_dissimilar_blocks =  all_block_information.filter(x => x.block_type == "simple_dissimilar") 
        shuffleArray(simple_dissimilar_blocks)
    }

    if (show_complex){

      var complex_dissimilar_blocks = all_block_information.filter(x => x.block_type == "complex_dissimilar") 
    
      // first shuffle these two block types
      shuffleArray(complex_dissimilar_blocks)

    }
 

   
     
    
    for (i = 0; i < loop_length; i++){
        
        
        // add the exposure type 
        if(show_simple){
            var current_sd = simple_dissimilar_blocks[i]
            current_sd.exposure_type = exposure_type[i]

        }

        if (show_complex){
          var current_cd = complex_dissimilar_blocks[i]
          current_cd.exposure_type = exposure_type[i]

        }
        

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

function generate_dissimilar_block(stims, num_blocks, num_trial_per_block, current_deivant_position, block_type){

  // generate dissimilar blocks:
  // -> get random creature,
  // and choose another creature that differs in species and movement

  // choose random creature as background

  var randomIdx = Math.floor(Math.random() * stims.length)
  var background = stims[randomIdx];
  // and get info about species, modification, movement/rotation
  speciesInfo_1 = background.slice(background.length-10, background.length-8)
  stims = stims.filter(x => !(x.includes(speciesInfo_1)))


  
  var randomIdx = Math.floor(Math.random() * stims.length)
  var deviant = stims[randomIdx]

  speciesInfo_2 = deviant.slice(deviant.length-10, deviant.length-8)
  
  stims = stims.filter(x => !(x.includes(speciesInfo_2)))


  var randomIdx = Math.floor(Math.random() * stims.length)
  var novel = stims[randomIdx]
  
  speciesInfo_3 = novel.slice(novel.length-10, novel.length-8)
  
  stims = stims.filter(x => !(x.includes(speciesInfo_3)))


  var memory_items = [background, novel]
  shuffleArray(memory_items)
  //var memory_item = memory_items[Math.floor(Math.random() * memory_items.length)]

  if (memory_items[0] == background){
    var correct_answer = "left"
  }else{
    var correct_answer = "right"
  }

  
      block_information = {
          num_trial_per_block: num_trial_per_block,
          background_stimuli: background,
          deviant_stimuli: deviant,
          deviant_position_array: [current_deivant_position],
          block_type: block_type, 
          memory_items: memory_items, 
          correct_answer: correct_answer
          
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

