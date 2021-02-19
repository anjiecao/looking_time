



// ---------- General Helper functions ---------- //

// function returning an object with the frequency of it occurrences in the array

function count_occurence(array){
    var occurences = {}
    for (var i = 0; i < array.length; i++){
        occurences[array[i]] = (occurences[array[i]] || 0) +1
    }
    return occurences
}

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

// This function return a random subarray of [arr] of [size] length
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

// This function return an array of [len] length filled with value
// e.g. if value = "a", len = 3, return ["a", "a", "a"]
function fillArray(value, len) {
  if (len == 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}

// This function shuffles the current array
// !! DOES NOT MAKE COPY!!
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// this function loops through an arrayA and check if any of the element has occured in arrayB
// return boolean
function has_duplicate(arrayA, arrayB){

    duplicate_count = 0
    for (var i = 0; i < arrayA.length; i ++){
        for (var j = 0; j < arrayB.length; j++){
            if (arrayA[i] == arrayB[j]){
                duplicate_count = duplicate_count + 1
            }
        }
    }

    if (duplicate_count == 0){
        return false
    }else{
        return true
    }

}



//Generate N-1 random numbers between 0 and 1, add the numbers 0 and 1 themselves to the list, sort them, and take the differences of adjacent numbers.
// reference: https://stackoverflow.com/questions/2640053/getting-n-random-numbers-whose-sum-is-m
// this function returns an array of [n_chunk] integer that sums to [sum]
function generate_random_num_array(sum, n_chunk){

  var random_array = []
  for (var i = 0; i < n_chunk-1; i++){

    //Generate N-1 random numbers between 0 and 1, add the numbers 0 and 1
    var random = Math.floor(Math.random() * sum)
    random_array.push(random)

  }
  random_array.push(0)
  random_array.push(sum)
  //sort
  random_array.sort(function(a, b) {
  return a - b;
});

 var random_num_array = []
  // loop through the array and calculate differences
  // start from the second item
  for (var i = 1; i < random_array.length; i++){
    var current = random_array[i]
    var prev = random_array[i-1]
    var diff = current-prev
    random_num_array.push(diff)

  }
  return random_num_array
}


// pop multiple elements from the array
// !! MODIFY THE ORIGINAL
// return the popped elements in the array
function pop_multiple(array, n){

  if (n > array.length){
    alert("pop_multiple n exceeds array length!")
  }else{
  var popped_array = []
  for (var i = 0; i < n; i++){
    var popped_item = array.pop()
    popped_array.push(popped_item)
  }}
  return popped_array
}



// -------- V2 dealing with Stimuli --------- //
// currently ignoring inter-relationship between stimuli
// just get all stimuli
function get_all_stimuli(TEST_RUN){


    all_stimuli = []
    MAIN_DIR = "stimuli/images/spore_stims/"

    if (TEST_RUN == 1) {
      // 30 species
      species = Array.from({length: 4}, (_, i) => i + 1)
    }
    else {
      // 20 species
      species = Array.from({length: 12}, (_, i) => i + 1)
    }

    // set number is specified in experiment.html
      for (var j = 0; j < species.length; j++){

          // add 0's before number for species number less than 0
          if (species[j] < 10) {
            current_species = '0' + species[j]
          }
          else {
            current_species = species[j]
          }

          current_stimuli = MAIN_DIR + 'simple_' + current_species + "_A.gif"

           all_stimuli.push(current_stimuli)
         }

    return (all_stimuli)

}
                                                                                                                                                                                                                                                                                                                                                                    // -------- V2 generate timeline variable for each bl
function generate_timeline_variables(block_information){

    background_location = block_information.background_location
    deviant_location = block_information.deviant_location
    background_stimuli = block_information.background_stimuli
    deviant_stimuli = block_information.deviant_stimuli
    deviant_position_array = block_information.deviant_position_array
    block_length = block_information.num_trial
    block_type = block_information.block_type

    console.log('block_type')
    console.log(block_type)

     // pick the appropriate wall animation for background item
     if (background_location == "right"){

         background_wall_animation = 'stimuli/images/wall_2.mp4'
         background_location_percent = '50%'

     }else if (background_location == "left"){

         background_wall_animation = 'stimuli/images/wall_1.mp4'
         background_location_percent = '16%'
     }

     // pick the appropriate wall animation for deviant item
     if (deviant_location == "right"){
         deviant_wall_animation = 'stimuli/images/wall_2.mp4'
         deviant_location_percent = '55%'

     }else if (deviant_location == "left"){
        deviant_wall_animation = 'stimuli/images/wall_1.mp4'
        deviant_location_percent = '16%'

     }


     background_item = {
         wall_animation: background_wall_animation,
         stimuli: background_stimuli,
         location: background_location,
         location_percent: background_location_percent,
         stim_type: 'background',
         trial_duration: 6000
     }


      background_item_last = {
          wall_animation: background_wall_animation,
          stimuli: background_stimuli,
          location: background_location,
          location_percent: background_location_percent,
          stim_type: 'background',
          trial_duration: null
      }


     deviant_item = {
         wall_animation: deviant_wall_animation,
         stimuli: deviant_stimuli,
         location: deviant_location,
         location_percent: deviant_location_percent,
         stim_type: 'deviant',
         trial_duration: null
     }


    block_stimuli = fillArray(background_item, block_length)



    if (block_type == 'Dev'){
      block_stimuli[block_length] = deviant_item // replace last with deviant
    }
    else if (block_type = 'Std') {
      block_stimuli[block_length] = background_item_last // don't replace but set trial duration to null for indefinite looking
    }


    // get familiarization clips
    music_fam_array = ['stimuli/audio/music_1.wav',
                       'stimuli/audio/music_2.wav',
                       'stimuli/audio/music_3.wav',
                       'stimuli/audio/music_4.wav',
                       'stimuli/audio/music_5.wav',
                       'stimuli/audio/music_6.wav',
                       'stimuli/audio/music_7.wav',
                       'stimuli/audio/music_8.wav',
                       'stimuli/audio/music_9.wav',
                       'stimuli/audio/music_10.wav'
   ]

   // get test clips
   music_test_array = ['stimuli/audio/music_test_1.wav',
                      'stimuli/audio/music_test_2.wav',
                      'stimuli/audio/music_test_3.wav'
  ]


    shuffleArray(music_fam_array)
    shuffleArray(music_test_array)


    block_stimuli = []

    for (i = 0; i < block_length; i++) {

      block_stimuli[i] = {
          wall_animation: background_wall_animation,
          stimuli: background_stimuli,
          location: background_location,
          location_percent: background_location_percent,
          stim_type: 'background',
          trial_duration: 6000,
          music: music_fam_array[i],
          inter_trial: 'stimuli/images/blank_fam.png'
        }
      }

    if (block_type == 'Dev'){
      block_stimuli[block_length] = {
          wall_animation: deviant_wall_animation,
          stimuli: deviant_stimuli,
          location: deviant_location,
          location_percent: deviant_location_percent,
          stim_type: 'deviant',
          trial_duration: null,
          music: music_test_array[1],
          inter_trial: 'stimuli/images/blank_test.png'
      }
    }

    else if (block_type = 'Std') {
      block_stimuli[block_length] = {
          wall_animation: background_wall_animation,
          stimuli: background_stimuli,
          location: background_location,
          location_percent: background_location_percent,
          stim_type: 'background',
          trial_duration: null,
          music: music_test_array[1],
          inter_trial: 'stimuli/images/blank_test.png'
      }
    }

    console.log('block_stimuli')
    console.log(block_stimuli)

    return (block_stimuli)

}

// -------- V2 generate all blocks combination --------- //

function generate_all_block(condition_num,
                            num_blocks,
                            num_trial_per_block,
                            stimuli_array,
                            num_species){


    // check that number of blocks is divisible by 2
    if (num_blocks % 2 != 0){
      throw 'Number of blocks should be divisible by 2, to have equal number of each block type';
    }

    // rotate fam order and block type arrays by rotation num
    rotation_num = condition_num % num_blocks


    // determine familiarization order
    fam_num = [3,7,5,5,7,3]
    fam_num.length = num_blocks
    fam_orders = arrayRotate(fam_num, rotation_num)

    console.log('fam_orders')

    console.log(fam_orders)

    // determine block types
    block_types = ["Std", "Dev", "Dev", "Std", "Std", "Dev"]
    block_orders = arrayRotate(block_types, rotation_num)


    // determine the rotation number for stimuli
    if (condition_num / 6 <= 1){
      pair_rotation_num = 0
    }

    else if (condition_num / 6 <= 2) {
      pair_rotation_num = 1
    }

    else if (condition_num / 6 <= 3) {
      pair_rotation_num = 2
    }

    // determine the order of pairs
    pairs = [1,2,3,4,5,6]
    pairs_order = arrayRotate(pairs, pair_rotation_num)

    // backgrounds are even indices and deviants are uneven indices
    randomNum = Math.random()
    if (randomNum < 0.5){
      background_shift = 0
      deviant_shift = 1

    }
    // backgrounds are uneven indices and deviants are even indices
    else {
      background_shift = 1
      deviant_shift = 0

    }

    // get paths to all background stimuli
    backgrounds = []
    for (var i = 0; i < stimuli_array.length/2; i++) {
        backgrounds.push(stimuli_array[i*2 + background_shift])
      }

    // get paths to all deviant stimuli
    deviants = []
    for (var i = 0; i < stimuli_array.length/2; i++) {
        deviants.push(stimuli_array[i*2 + deviant_shift])
      }


      console.log('backgrounds')
      console.log(backgrounds)
      console.log('deviants')
      console.log(deviants)

    all_block_information = []


    // put a loop around this with the number of blocks of this type
    for (i = 0; i < num_blocks; i++) {

    // simple similar blocks
     block_information = generate_block(backgrounds[i], deviants[i], fam_orders[i], num_species, block_types[i])

     all_block_information.push(block_information)
  }

    console.log(all_block_information)

    return (all_block_information)

}

function generate_block(background, deviant, num_trial, num_species, block_type){

  // assign locations
  locations = ["left", "right"]

  block_stimuli = [background, deviant]

  // get location for the wall animation
  shuffleArray(locations)

  background_location = locations[0]
  deviant_location = locations[1]

  // generate array of stimulus paths to index into for pref tests
  var stims_in_order = []

  stims_in_order.push(block_stimuli[locations.indexOf('left')])
  stims_in_order.push(block_stimuli[locations.indexOf('right')])

  // generate array of stimulus types to keep track
  var stim_types = ['background', 'deviant']

  var stim_type_locations = []

  stim_type_locations.push(stim_types[locations.indexOf('left')])
  stim_type_locations.push(stim_types[locations.indexOf('right')])


      block_information = {
          num_trial: num_trial,
          background_stimuli: background,
          deviant_stimuli: deviant,
          background_location: background_location,
          deviant_location: deviant_location,
          stims_in_order: stims_in_order,
          stim_type_locations: stim_type_locations,
          block_type: block_type
      }


return (block_information)
}
