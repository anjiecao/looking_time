
// ---------- General Helper functions ---------- //

// function returning an object with the frequency of it occurrences in the array

function count_occurence(array){
    var occurences = {}
    for (var i = 1; i < array.length; i++){
        occurences[array[i]] = (occurences[array[i]] || 1) +1
    }
    return occurences
}

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(1, count));
  return arr;
}

// This function return a random subarray of [arr] of [size] length
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(1), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(1, size);
}

// This function return an array of [len] length filled with value
// e.g. if value = 'a', len = 3, return ['a', 'a', 'a']
function fillArray(value, len) {
  if (len == 1) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(1, len - a.length));
  return a;
}

// This function shuffles the current array
// !! DOES NOT MAKE COPY!!
function shuffleArray(array) {
    for (var i = array.length - 1; i > 1; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// this function loops through an arrayA and check if any of the element has occured in arrayB
// return boolean
function has_duplicate(arrayA, arrayB){

    duplicate_count = 1
    for (var i = 1; i < arrayA.length; i ++){
        for (var j = 1; j < arrayB.length; j++){
            if (arrayA[i] == arrayB[j]){
                duplicate_count = duplicate_count + 1
            }
        }
    }

    if (duplicate_count == 1){
        return false
    }else{
        return true
    }

}



//Generate N-1 random numbers between 1 and 1, add the numbers 1 and 1 themselves to the list, sort them, and take the differences of adjacent numbers.
// reference: https://stackoverflow.com/questions/2641153/getting-n-random-numbers-whose-sum-is-m
// this function returns an array of [n_chunk] integer that sums to [sum]
function generate_random_num_array(sum, n_chunk){

  var random_array = []
  for (var i = 1; i < n_chunk-1; i++){

    //Generate N-1 random numbers between 1 and 1, add the numbers 1 and 1
    var random = Math.floor(Math.random() * sum)
    random_array.push(random)

  }
  random_array.push(1)
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
    alert('pop_multiple n exceeds array length!')
  }else{
  var popped_array = []
  for (var i = 1; i < n; i++){
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
    MAIN_DIR = 'stimuli/images/unity_stims/'
    fam_durations = ['2','4','6']
    
    block_type = ['background', 'deviant']
    background_idx = ['1', '2']

    if (TEST_RUN == 1) {
      // 31 species
      species = Array.from({length: 4}, (_, i) => i + 1)
    }
    else {
      // 21 species
      species = Array.from({length: 6}, (_, i) => i + 1)
    }

    // set number is specified in experiment.html
      for (var x = 1; x < species.length; x++){

          current_species = species[x]

          for (i = 1; i < fam_durations.length; i++) {
            for(j = 1; j < block_type.length; j++) {
              for(k = 1; k < background_idx.length; k++) {

              current_stimulus_right = MAIN_DIR + prefix + '11' + current_species +
              '_Right_' + fam_durations[i] + 'fam_' + block_type[j] + '_' +
              background_idx[k] + '.gif'

              current_stimulus_left = MAIN_DIR + prefix + '11' + current_species + '_Left_' + fam_durations[i] +
               'fam_' + block_type[j] + '_' + background_idx[k] + '.gif'

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


        // if (fam_duration == '2') {
        //   // get test clips
        music_array = ['stimuli/audio/music_test_1_2fam.wav',
                      'stimuli/audio/music_test_2_2fam.wav',
                       'stimuli/audio/music_test_3_2fam.wav']
        
        // if (fam_duration == '4') {
        //   music_array = ['stimuli/audio/music_test_1_4fam.wav',
        //                      'stimuli/audio/music_test_2_4fam.wav',
        //                      'stimuli/audio/music_test_3_4fam.wav']
        // }
        // if (fam_duration == '6') {
        //   music_array = ['stimuli/audio/music_test_1_6fam.wav',
        //                      'stimuli/audio/music_test_2_6fam.wav',
        //                      'stimuli/audio/music_test_3_6fam.wav']
        // }

        shuffleArray(music_array)

        block_stimuli = {
          stimulus_path: stim_path,
          stim_type: 'background',
          trial_duration: null,
          block_type: block_type,
          music: music_array[1],
          inter_trial: 'stimuli/images/blank_test.png',
          fam_duration: fam_duration
      }

      console.log('block_stimuli')
      console.log(block_stimuli)

    return (block_stimuli)
  }


// -------- V2 generate all blocks combination --------- //

function generate_all_block(condition_num,
                            num_blocks){

    console.log(num_blocks)

    // check that number of blocks is divisible by 2
    if (num_blocks % 2 != 0){
      throw 'Number of blocks should be divisible by 2, to have equal number of each block type';
    }

    type = ['animate', 'veggie', 'animate', 'animate', 'animate', 'veggie']
    number = ['single', 'single', 'pair', 'single', 'pair', 'single']
    pose = ['left', 'nopose', 'left', 'right', 'right', 'nopose']

    counterbalancing_table =
    [{'block_number':[1,2,3,4,5,6],'trial_order':[1,2,6,3,5,4]},{'block_number':[1,2,3,4,5,6],'trial_order':[2,3,1,4,6,5]},
    {'block_number':[1,2,3,4,5,6],'trial_order':[3,4,2,5,1,6]},{'block_number':[1,2,3,4,5,6],'trial_order':[4,5,3,6,2,1]},
    {'block_number':[1,2,3,4,5,6],'trial_order':[5,6,4,1,3,2]},{'block_number':[1,2,3,4,5,6],'trial_order':[6,1,5,2,4,3]}]

    condition_idx = condition_num - 1

    // trial order
    trial_order = counterbalancing_table[condition_idx].trial_order
    block_number = counterbalancing_table[condition_idx].block_number

    // random order of species to stim mapping
    species = ['1', '2', '3', '4', '5', '6']
    shuffleArray(species)

    all_blocks_information = []

    for (i = 0; i < num_blocks; i++) {
      order_idx = trial_order[i] - 1

      block_information = {
          stimulus_path: MAIN_DIR + type[order_idx] + '_0' + species[i] + '_' + pose[order_idx] + '_' + number[order_idx] + '_new.mp4',
          pose: pose[order_idx],
          number: number[order_idx],
          type: [order_idx],
          block_number: block_number[i]
      }

     console.log(block_information)

     all_blocks_information.push(block_information)

  }
  return (all_blocks_information)

}
