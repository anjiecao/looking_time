



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
function get_all_stimuli(TEST_RUN, COMPLEX){

  if (COMPLEX == true) {
    prefix = 'complex_'
  }
  else {
    prefix = 'simple_'
  }

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

          current_stimuli = MAIN_DIR + prefix + current_species + "_A.gif"

          all_stimuli.push(current_stimuli)
         }


    // put creatures in pairs


    return (all_stimuli)

}
                                                                                                                                                                                                                                                                                                                                                                    // -------- V2 generate timeline variable for each bl
function generate_timeline_variables(block_information){

    background_stimuli = block_information.background_stimuli
    deviant_stimuli = block_information.deviant_stimuli
    block_type = block_information.block_type
    fam_duration = block_information.fam_duration

    console.log('block_information')
    console.log(block_information)

     background_item = {
         stimuli: background_stimuli,
         stim_type: 'background',
         trial_duration: 6000
     }

      standard_item_last = {
          stimuli: background_stimuli,
          stim_type: 'background',
          trial_duration: null
      }

     deviant_item = {
         stimuli: deviant_stimuli,
         stim_type: 'deviant',
         trial_duration: null
     }


    block_stimuli = fillArray(background_item, fam_duration)



    if (block_type == 'Dev'){
      block_stimuli[fam_duration] = deviant_item // replace last with deviant
    }
    else if (block_type = 'Std') {
      block_stimuli[fam_duration] = standard_item_last // don't replace but set trial duration to null for indefinite looking
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

    for (i = 0; i < fam_duration; i++) {

      block_stimuli[i] = {
          stimuli: background_stimuli,
          stim_type: 'background',
          trial_duration: 6000,
          music: music_fam_array[i],
          inter_trial: 'stimuli/images/blank_fam.png',
          fam_duration: fam_duration,
          block_type: block_type
        }
      }

    if (block_type == 'Dev'){
      block_stimuli[fam_duration] = {
          stimuli: deviant_stimuli,
          stim_type: 'deviant',
          trial_duration: null,
          music: music_test_array[1],
          inter_trial: 'stimuli/images/blank_test.png',
          fam_duration: fam_duration,
          block_type: block_type
      }
    }

    else if (block_type = 'Std') {
      block_stimuli[fam_duration] = {
          stimuli: background_stimuli,
          stim_type: 'background',
          trial_duration: null,
          music: music_test_array[1],
          inter_trial: 'stimuli/images/blank_test.png',
          fam_duration: fam_duration,
          block_type: block_type

      }
    }

    console.log('block_stimuli')
    console.log(block_stimuli)

    return (block_stimuli)

}

// -------- V2 generate all blocks combination --------- //

function generate_all_block(subject_num,
                            num_blocks,
                            num_trial_per_block,
                            stimuli_array,
                            num_species){



    // check that number of blocks is divisible by 2
    if (num_blocks % 2 != 0){
      throw 'Number of blocks should be divisible by 2, to have equal number of each block type';
    }


    counterbalancing_table = [{"fam_duration":[3,3,7,5,7,5],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[1,2,6,3,5,4]},{"fam_duration":[3,5,3,5,7,7],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[2,3,1,4,6,5]},{"fam_duration":[5,5,3,7,3,7],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[3,4,2,5,1,6]},{"fam_duration":[5,7,5,7,3,3],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[4,5,3,6,2,1]},{"fam_duration":[7,7,5,3,5,3],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[5,6,4,1,3,2]},{"fam_duration":[7,3,7,3,5,5],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[6,1,5,2,4,3]},{"fam_duration":[3,3,7,5,7,5],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[1,2,6,3,5,4]},{"fam_duration":[3,5,3,5,7,7],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[2,3,1,4,6,5]},{"fam_duration":[5,5,3,7,3,7],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[3,4,2,5,1,6]},{"fam_duration":[5,7,5,7,3,3],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[4,5,3,6,2,1]},{"fam_duration":[7,7,5,3,5,3],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[5,6,4,1,3,2]},{"fam_duration":[7,3,7,3,5,5],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[6,1,5,2,4,3]},{"fam_duration":[3,3,7,5,7,5],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[1,2,6,3,5,4]},{"fam_duration":[3,5,3,5,7,7],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[2,3,1,4,6,5]},{"fam_duration":[5,5,3,7,3,7],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[3,4,2,5,1,6]},{"fam_duration":[5,7,5,7,3,3],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[4,5,3,6,2,1]},{"fam_duration":[7,7,5,3,5,3],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[5,6,4,1,3,2]},{"fam_duration":[7,3,7,3,5,5],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[6,1,5,2,4,3]},{"fam_duration":[3,3,7,5,7,5],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[1,2,6,3,5,4]},{"fam_duration":[3,5,3,5,7,7],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[2,3,1,4,6,5]},{"fam_duration":[5,5,3,7,3,7],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[3,4,2,5,1,6]},{"fam_duration":[5,7,5,7,3,3],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[4,5,3,6,2,1]},{"fam_duration":[7,7,5,3,5,3],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[5,6,4,1,3,2]},{"fam_duration":[7,3,7,3,5,5],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[6,1,5,2,4,3]},{"fam_duration":[3,3,7,5,7,5],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[1,2,6,3,5,4]},{"fam_duration":[3,5,3,5,7,7],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[2,3,1,4,6,5]},{"fam_duration":[5,5,3,7,3,7],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[3,4,2,5,1,6]},{"fam_duration":[5,7,5,7,3,3],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[4,5,3,6,2,1]},{"fam_duration":[7,7,5,3,5,3],"block_type":["Std","Dev","Dev","Std","Std","Dev"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[5,6,4,1,3,2]},{"fam_duration":[7,3,7,3,5,5],"block_type":["Dev","Std","Std","Dev","Dev","Std"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[6,1,5,2,4,3]}]

    fam_orders = counterbalancing_table[subject_num].fam_duration
    block_orders = counterbalancing_table[subject_num].block_type

    console.log('block_orders')
    console.log(block_orders)

    console.log('fam_orders')
    console.log(fam_orders)

    // random order of pairs
    pairs = [0,1,2,3,4,5]
    shuffleArray(pairs)

    console.log('pairs')
    console.log(pairs)

    background_shifts = Array.from({length: 6}, () => Math.floor(Math.random() * 2));

    deviant_shifts = Array()

    for (var i = 0; i < background_shifts.length; i++) {
      deviant_shifts.push(Math.abs(background_shifts[i]-1))
    }

    // get paths to all background stimuli
    backgrounds = []
    for (var i = 0; i < stimuli_array.length/2; i++) {
        backgrounds.push(stimuli_array[pairs[i]*2 + background_shifts[i]])
      }

    // get paths to all deviant stimuli
    deviants = []
    for (var i = 0; i < stimuli_array.length/2; i++) {
        deviants.push(stimuli_array[pairs[i]*2 + deviant_shifts[i]])
      }


      console.log('backgrounds')
      console.log(backgrounds)
      console.log('deviants')
      console.log(deviants)

    all_block_information = []

    for (i = 0; i < num_blocks; i++) {
        block_information = {
            fam_duration: fam_orders[i],
            background_stimuli: backgrounds[i],
            deviant_stimuli: deviants[i],
            block_type: block_orders[i],
        }

     all_block_information.push(block_information)
  }

    console.log(all_block_information)
    console.log('all_block_information')

    return (all_block_information)

}
