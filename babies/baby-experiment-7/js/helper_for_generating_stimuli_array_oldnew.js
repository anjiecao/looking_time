
// ---------- General Helper functions ---------- //

// function returning an object with the frequency of it occurrences in the array
MAIN_DIR = "stimuli/images/unity_stims"


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

function getRandomSubarray(array, size) {
  // Copy the original array to avoid modifying it
  let tempArray = array.slice();
  let result = [];
  let background_index = condition_order.indexOf('background');
  let deviant_index = condition_order.indexOf('identity');

  for(let i = 0; i < size; i++){
      // Choose a random index
      let randomIndex = Math.floor(Math.random() * tempArray.length);
      // Remove the item at the random index from the tempArray and push it to result
      result.push(tempArray.splice(randomIndex, 1)[0]);
  }
  return result;
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

    function generate_timeline_variables(block_information){

      console.log('block_information')

      console.log(block_information)

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
          violation_type: block_information.violation_type,
          music: music_array[1],
          inter_trial: 'stimuli/images/blank_test.png',
          fam_duration: block_information.fam_duration,
          species: block_information.species
      }

      console.log('block_stimuli')
      console.log(block_stimuli)

    return (block_stimuli)
  }


// -------- V2 generate all blocks combination --------- //

function generate_all_block(condition_order,
                            num_blocks){

    console.log(num_blocks)

    // check that number of blocks is divisible by 2
    if (num_blocks % 2 != 0){
      throw 'Number of blocks should be divisible by 2, to have equal number of each block type';
    }
  
    // trial order
    block_number = [1,2,3,4]

    // random order of species to stim mapping
    species = ['1', '2', '3', '4', '5', '6']
    species = getRandomSubarray(species, 4)
    shuffleArray(species)
    console.log(species)
    if (condition_order.includes('identity')){
      background = parseInt(species[condition_order.indexOf('background')])
      if (background%2 == 0){
        pair = background -1
      }
      else{
        pair = background+1
      }
      while (species[condition_order.indexOf('identity')] == pair.toString()){
        shuffleArray(species)
        background = parseInt(species[condition_order.indexOf('background')])
        if (background %2 == 0){
          pair == background-1
        }
        else{
          pair = background +1
        }
      }
    }
    console.log(species)

    // random order of 8 vs 9 fam
    fam_duration = ['8','9','8','9']
    shuffleArray(fam_duration)

    all_blocks_information = []

    for (i = 0; i < num_blocks; i++) {
      
      block_information = {
          stimulus_path: MAIN_DIR + '/fam' + fam_duration[i] + '/'  + condition_order[i]
          + '/animate_0' + species[i] + '_' + fam_duration[i] + 'fam' + '_' + condition_order[i] + '_new.mp4',
          violation_type: condition_order[i],
          species: species[i],
          fam_duration: fam_duration[i]
      }

     console.log(block_information)

     all_blocks_information.push(block_information)

  }
  return (all_blocks_information)

}
