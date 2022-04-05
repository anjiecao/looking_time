
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

  all_stimuli_right = []
  all_stimuli_left = []

    prefix = 'unitystims_'
    MAIN_DIR = "stimuli/images/unity_stims/"
    fam_durations = ['0','4','8']
    block_type = ['background', 'deviantiant']
    background_idx = ['1', '2']

    if (TEST_RUN == 1) {
      // 30 species
      species = Array.from({length: 4}, (_, i) => i + 1)
    }
    else {
      // 20 species
      species = Array.from({length: 6}, (_, i) => i + 1)
    }

    // set number is specified in experiment.html
      for (var x = 0; x < species.length; x++){

          current_species = species[x]

          for (i = 0; i < fam_durations.length; i++) {
            for(j = 0; j < block_type.length; j++) {
              for(k = 0; k < background_idx.length; k++) {

              current_stimulus_right = MAIN_DIR + prefix + '00' + current_species +
              '_Right_' + fam_durations[i] + 'fam_' + block_type[j] + '_' +
              background_idx[k] + " .gif"

              current_stimulus_left = MAIN_DIR + prefix + '00' + current_species + '_Left_' + fam_durations[i] +
               'fam_' + block_type[j] + '_' + background_idx[k] + ".gif"

              all_stimuli_right.push(current_stimulus_right)
              all_stimuli_left.push(current_stimulus_left)
            }
          }
        }
      }

          all_stimuli = {
            stim_facingright: all_stimuli_right,
            stim_facingleft: all_stimuli_left
          }

          console.log('all_stimuli')
          console.log(all_stimuli)


    // put creatures in pairs
    return (all_stimuli)
}

    function generate_timeline_variables(block_information){

        stim_path = block_information.stimulus_path
        block_type = block_information.block_type
        fam_duration = block_information.fam_duration

       // get test clips
       music_array = ['stimuli/audio/music_test_1_withSFX.wav',
                          'stimuli/audio/music_test_2_withSFX.wav',
                          'stimuli/audio/music_test_3_withSFX.wav'
      ]

        shuffleArray(music_array)

        block_stimuli = {
          stimulus_path: stim_path,
          stim_type: 'background',
          trial_duration: null,
          block_type: block_type,
          music: music_array[1],
          inter_trial: 'stimuli/images/blank_test.png'
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


    counterbalancing_table =
    [{"fam_duration":[0,0,8,4,8,4],"block_type":["standard","deviant","deviant","standard","standard","deviant"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[1,2,6,3,5,4]},
    {"fam_duration":[0,4,0,4,8,8],"block_type":["deviant","standard","standard","deviant","deviant","standard"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[2,3,1,4,6,5]},
    {"fam_duration":[4,4,0,8,0,8],"block_type":["standard","deviant","deviant","standard","standard","deviant"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[3,4,2,5,1,6]},
    {"fam_duration":[4,8,4,8,0,0],"block_type":["deviant","standard","standard","deviant","deviant","standard"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[4,5,3,6,2,1]},
    {"fam_duration":[8,8,4,0,4,0],"block_type":["standard","deviant","deviant","standard","standard","deviant"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[5,6,4,1,3,2]},
    {"fam_duration":[8,0,8,0,4,4],"block_type":["deviant","standard","standard","deviant","deviant","standard"],"block_number":[1,2,3,4,5,6],"counterbalancing_condition":[6,1,5,2,4,3]}]


    condition_idx = condition_num - 1

    fam_orders = counterbalancing_table[condition_num].fam_duration
    block_orders = counterbalancing_table[subject_num].block_type

    // random order of pairs
    species = ["1", "2", "3", "4", "5", "6"]
    shuffleArray(species)

    // background idx
    background_idx = ["1", "2", "1", "2", "1", "2"]
    shuffleArray(background_idx)


    // random left or right order
    left_or_right = ['_Left_', '_Right_', '_Left_', '_Right_', '_Left_', '_Right_']
    shuffleArray(left_or_right)

    all_blocks_information = []

    for (i = 0; i < num_blocks; i++) {
        block_information = {
            stimulus_path: MAIN_DIR + prefix + '00' + species[i] + left_or_right[i] + fam_orders[i] +
             'fam_' + block_orders[i] + '_' + background_idx[i] + ".gif",
            fam_duration: fam_orders[i],
            block_type: block_orders[i],
        }

     all_blocks_information.push(block_information)

  }
    return (all_blocks_information)

}
