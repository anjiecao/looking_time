



// ---------- General Helper functions ---------- //

// function returning an object with the frequency of it occurrences in the array

function count_occurence(array){
    var occurences = {}
    for (var i = 0; i < array.length; i++){
        occurences[array[i]] = (occurences[array[i]] || 0) +1
    }
    return occurences


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



// ---------- Dealing with Stimuli ---------- //

function get_all_stimuli(){

    all_sets = []
    MAIN_DIR = "images/training/"

    // set number is specified in experiment.html
    for (var i = 1; i < SET_NUM + 1; i++){

        var current_set = i

        background_array = []
        for (var background_index = 1; background_index < 5; background_index++){
            background_path = MAIN_DIR + current_set + "/" + "background/" + background_index + ".png"
            background_array.push(background_path)
        }

        deviant_array = []
        for (var deviant_index = 1; deviant_index < 5; deviant_index++){
            deviant_path = MAIN_DIR + current_set + "/" + "deviant/" + deviant_index + ".png"
            deviant_array.push(deviant_path)
        }

        probes_array = []
        for (var probes_index = 1; probes_index < 17; probes_index++){
            probes_path = MAIN_DIR + current_set + "/" + "probes/" + probes_index + ".png"
            probes_array.push(probes_path)
        }

        block_stim_set = {
            background: background_array,
            deviant: deviant_array,
            probes: probes_array
        }

        all_sets.push(block_stim_set)
    }

    return (all_sets)

}


function generate_set_combination(all_sets_array){

    all_sets_combination_array = []

    for (i = 0; i < all_sets_array.length; i ++){

        current_set = all_sets_array[i]
        current_background = current_set.background
        current_deviants = current_set.deviant

        //b_i = 0, b_i = 1 => simple background
        //b_i = 2, b_i = 3 => complex background
        //d_i = 0, d_i = 1 => simple deviant
        //d_i = 2, d_i = 3 => complex deviant
        // deviants with same numbers are more similar to the background

        set_combination = {
            simple_a: {
                simple_similar: {background:"", deviant: ""},
                simple_dissimilar: {background:"", deviant: ""},
                complex_similar: {background:"", deviant: ""},
                complex_dissimilar:{background:"", deviant: ""},
            },
            simple_b: {
                simple_similar: {background:"", deviant: ""},
                simple_dissimilar: {background:"", deviant: ""},
                complex_similar: {background:"", deviant: ""},
                complex_dissimilar:{background:"", deviant: ""},
            },
            complex_a: {
                simple_similar: {background:"", deviant: ""},
                simple_dissimilar: {background:"", deviant: ""},
                complex_similar: {background:"", deviant: ""},
                complex_dissimilar:{background:"", deviant: ""},
            },
            complex_b: {
                simple_similar: {background:"", deviant: ""},
                simple_dissimilar: {background:"", deviant: ""},
                complex_similar: {background:"", deviant: ""},
                complex_dissimilar:{background:"", deviant: ""},
            },

        }

        for (b_i = 0; b_i < current_background.length; b_i ++){

            current_b = current_background[b_i]

            if (b_i == 0){
                set_combination.simple_a.simple_similar.background = current_b
                set_combination.simple_a.simple_dissimilar.background = current_b
                set_combination.simple_a.complex_similar.background = current_b
                set_combination.simple_a.complex_dissimilar.background = current_b

                for (d_i = 0; d_i < current_deviants.length; d_i ++){
                    current_d = current_deviants[d_i]

                    if (d_i == 0){
                        set_combination.simple_a.simple_similar.deviant = current_d
                    }else if (d_i == 1){
                        set_combination.simple_a.simple_dissimilar.deviant = current_d
                    }else if (d_i == 2){
                        set_combination.simple_a.complex_similar.deviant = current_d
                    }else if (d_i == 3){
                        set_combination.simple_a.complex_dissimilar.deviant = current_d
                    }
                }
            }else if (b_i == 1){
                set_combination.simple_b.simple_similar.background = current_b
                set_combination.simple_b.simple_dissimilar.background = current_b
                set_combination.simple_b.complex_similar.background = current_b
                set_combination.simple_b.complex_dissimilar.background = current_b

                for (d_i = 0; d_i < current_deviants.length; d_i ++){
                    current_d = current_deviants[d_i]

                    if (d_i == 0){
                        set_combination.simple_b.simple_dissimilar.deviant = current_d
                    }else if (d_i == 1){
                        set_combination.simple_b.simple_similar.deviant = current_d
                    }else if (d_i == 2){
                        set_combination.simple_b.complex_dissimilar.deviant = current_d
                    }else if (d_i == 3){
                        set_combination.simple_b.complex_similar.deviant = current_d
                    }
                }

            }else if (b_i == 2){
                set_combination.complex_a.simple_similar.background = current_b
                set_combination.complex_a.simple_dissimilar.background = current_b
                set_combination.complex_a.complex_similar.background = current_b
                set_combination.complex_a.complex_dissimilar.background = current_b

                for (d_i = 0; d_i < current_deviants.length; d_i ++){
                    current_d = current_deviants[d_i]

                    if (d_i == 0){
                        set_combination.complex_a.simple_similar.deviant = current_d
                    }else if (d_i == 1){
                        set_combination.complex_a.simple_dissimilar.deviant = current_d
                    }else if (d_i == 2){
                        set_combination.complex_a.complex_similar.deviant = current_d
                    }else if (d_i == 3){
                        set_combination.complex_a.complex_dissimilar.deviant = current_d
                    }
                }

            }else if (b_i == 3){
                set_combination.complex_b.simple_similar.background = current_b
                set_combination.complex_b.simple_dissimilar.background = current_b
                set_combination.complex_b.complex_similar.background = current_b
                set_combination.complex_b.complex_dissimilar.background = current_b

                for (d_i = 0; d_i < current_deviants.length; d_i ++){
                    current_d = current_deviants[d_i]

                    if (d_i == 0){
                        set_combination.complex_b.simple_dissimilar.deviant = current_d
                    }else if (d_i == 1){
                        set_combination.complex_b.simple_similar.deviant = current_d
                    }else if (d_i == 2){
                        set_combination.complex_b.complex_dissimilar.deviant = current_d
                    }else if (d_i == 3){
                        set_combination.complex_b.complex_similar.deviant = current_d
                    }
                }

            }


        }
        all_sets_combination_array.push(set_combination)

    }

    return (all_sets_combination_array)
}


// here we add the memory probe to the ALL_SET_COMBINATION object

function add_probes(set_combinations, paths) {



 // loop through sets (this assumes that # of probes is identical in all sets, 16)
  for (i = 0; i < paths.length; i ++){

    // initialize probes array
    set_combinations[i].simple_a.simple_similar.probes = []
    set_combinations[i].simple_a.simple_dissimilar.probes = []
    set_combinations[i].simple_a.complex_similar.probes = []
    set_combinations[i].simple_a.complex_dissimilar.probes = []

    set_combinations[i].simple_b.simple_similar.probes = []
    set_combinations[i].simple_b.simple_dissimilar.probes = []
    set_combinations[i].simple_b.complex_similar.probes = []
    set_combinations[i].simple_b.complex_dissimilar.probes = []

    set_combinations[i].complex_a.simple_similar.probes = []
    set_combinations[i].complex_a.simple_dissimilar.probes = []
    set_combinations[i].complex_a.complex_similar.probes = []
    set_combinations[i].complex_a.complex_dissimilar.probes = []

    set_combinations[i].complex_b.simple_similar.probes = []
    set_combinations[i].complex_b.simple_dissimilar.probes = []
    set_combinations[i].complex_b.complex_similar.probes = []
    set_combinations[i].complex_b.complex_dissimilar.probes = []

    // loop through probes
    for (j = 0; j < paths[i].probes.length; j++){

      // insert all the probes that are identical and similar to the background
        if (j==0 || j==8) {
        set_combinations[i].simple_a.simple_similar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_a.simple_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_a.complex_similar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_a.complex_dissimilar.probes.push(paths[i].probes[j])

      }else if (j==1 || j==9) {
        set_combinations[i].simple_b.simple_similar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_b.simple_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_b.complex_similar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_b.complex_dissimilar.probes.push(paths[i].probes[j])

      }else if (j==2 || j==10) {
        set_combinations[i].complex_a.simple_similar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_a.simple_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_a.complex_similar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_a.complex_dissimilar.probes.push(paths[i].probes[j])

      }else if (j==3 || j==11) {
        set_combinations[i].complex_b.simple_similar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_b.simple_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_b.complex_similar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_b.complex_dissimilar.probes.push(paths[i].probes[j])

      // now we group by deviant, inserting deviant and d' (or novel)
    }else if (j==4|| j==12) {
        set_combinations[i].simple_a.simple_similar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_b.simple_similar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_a.simple_similar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_b.simple_similar.probes.push(paths[i].probes[j])

      }else if (j==5 || j==13) {
        set_combinations[i].simple_a.simple_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_b.simple_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_a.simple_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_b.simple_dissimilar.probes.push(paths[i].probes[j])

      }else if (j==6 || j==14) {
        set_combinations[i].simple_a.complex_similar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_b.complex_similar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_a.complex_similar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_b.complex_similar.probes.push(paths[i].probes[j])

      }else if (j==7 || j==15) {
        set_combinations[i].simple_a.complex_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].simple_b.complex_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_a.complex_dissimilar.probes.push(paths[i].probes[j])
        set_combinations[i].complex_b.complex_dissimilar.probes.push(paths[i].probes[j])
      }
  }
}

  console.log(set_combinations[0])


//console.log(set_combinations)


  return(set_combinations)
}


///


function generate_block_array(background,
                        deviant,
                        block_length,
                        deviant_position //0 - 9
                        ){

    // populate the array with background
    var block_array = fillArray(background, block_length)

    // replace one with the deviant
    block_array[deviant_position] = deviant

    return (block_array)

}





/*

function generate_block(identical_background,
                        background_type, // simple or complex
                        background_num, //0 or above
                        deviant_type, // simple or complex
                        deviant_num, // 0 or above
                        meta_stimuli_path // currently not working, how to keep track of the repetition stimuli
                        ){

    // if decided all the background stimuli are the same
    if (identical_background){

        // the single background stim to be repeated
        background_stim = get_from_stimuli(background_type, 1, meta_stimuli_path)[0]
        background_array = fillArray(background_stim, background_num)

        // need to drop from the meta_stimuli_path

        deviant_stim = get_from_stimuli(deviant_type, 1, meta_stimuli_path)[0]


        background_array.push(deviant_stim)
        block_array = background_array

    }else{
        block_array = []

    }


    var task_info = {
        background_stim: background_stim,
        deviant_stim: deviant_stim,
        background_type: background_type,
        background_num: background_num,
        deviant_type: deviant_type,
        blocks_array: block_array,
        block_type: "background_"+background_type+"_deviant_"+deviant_type,
        remaining_stimuli:meta_stimuli_path
    }
    return (task_info)




}
*/











// creating stimuli path pacakges without the block structure
function create_all_stimuli_no_block(meta_stimuli_path,
                                     type,
                                     n_trial,
                                     bkgd_freq,
                                     tg_freq,
                                     dvt_freq){


    var num_bkgd_trial = Math.floor(n_trial * bkgd_freq)
    var num_tg_trial = Math.floor(n_trial * tg_freq)
    var num_dvt_trial = Math.floor(n_trial * dvt_freq)

    var bkgd_tg_array // array
    var bkgd_stim; //str
    var tg_stim; //str

    var dvt_array; //array


    if (type === "all_simple"){
        console.log("all_simple")
        bkgd_tg_array = get_from_stimuli("simple",NUM_SIMPLE_STIMULI, meta_stimuli_path)
        //choose from full

    }else if(type === "all_complex"){
        bkgd_tg_array = get_from_stimuli("complex",NUM_COMPLEX_STIMULI, meta_stimuli_path)
    }else if(type === "mixed_simple_deviant"){
        bkgd_tg_array = get_from_stimuli("complex",NUM_COMPLEX_STIMULI, meta_stimuli_path)
    }else if (type === "mixed_complex_deviant"){
        bkgd_tg_array = get_from_stimuli("simple", NUM_SIMPLE_STIMULI, meta_stimuli_path)
    }else{(
        alert("wrong type in create_all_stimuli!")
    )}

    // randomly select one as bckgrd stimulus
    bkgd_stim = bkgd_tg_array[Math.floor(Math.random() * bkgd_tg_array.length)]

    // drop this one from both the bkgd_tg array and the metaarray so we don't repeat
    var meta_stimuli_index = meta_stimuli_path.indexOf(bkgd_stim);
    var bkgd_tg_array_index = bkgd_tg_array.indexOf(bkgd_stim)
    if (bkgd_tg_array_index > -1){
        bkgd_tg_array.splice(bkgd_tg_array_index,1)
    }else{
        alert("index error in create_all_stimuli!")
    }

    if (meta_stimuli_index > -1){
        meta_stimuli_path.splice(meta_stimuli_index, 1);
    }



    // randomly select another one as tg stimulus
    tg_stim = bkgd_tg_array[Math.floor(Math.random() * bkgd_tg_array.length)]

    // drop this one both the bkgd_tg array and the metaarray so we don't repeat
    meta_stimuli_index = meta_stimuli_path.indexOf(tg_stim);
    bkgd_tg_array_index = bkgd_tg_array.indexOf(tg_stim)
    if (bkgd_tg_array_index > -1){
        bkgd_tg_array.splice(bkgd_tg_array_index, 1)
    }else{
        alert("index error in create_all_simple_stimuli!")
    }

    if (meta_stimuli_index > -1){
        meta_stimuli_path.splice(meta_stimuli_index, 1);
    }

    if (type === "all_simple" | type === "all_complex"){
        dvt_stim_selected = getRandomSubarray(bkgd_tg_array, num_dvt_trial)
    }else if(type === "mixed_simple_deviant"){
        // If type mixed get from simple array
        simple_stimuli_for_mixed = get_from_stimuli("simple",NUM_SIMPLE_STIMULI, meta_stimuli_path)
        dvt_stim_selected = getRandomSubarray(simple_stimuli_for_mixed, num_dvt_trial)
    }else if (type === "mixed_complex_deviant"){
        complex_stimuli_for_mixed = get_from_stimuli("complex", NUM_COMPLEX_STIMULI, meta_stimuli_path)
        dvt_stim_selected = getRandomSubarray(complex_stimuli_for_mixed, num_dvt_trial)
    }



    var stim_array = []

    dvt_stim = dvt_stim_selected

    // drop the selected array from meta array
    meta_stimuli_path = meta_stimuli_path.filter(function(item){
        return dvt_stim.indexOf(item) === -1
    })

    selected_dvt_stim = getRandomSubarray(dvt_stim, num_dvt_trial)
    stim_array = stim_array.concat(selected_dvt_stim)

    //get rid of the chosen stimuli to prevent double selection
    dvt_stim = dvt_stim.filter(function(item){
                return selected_dvt_stim.indexOf(item) === -1; // not in the sampled array
            })



    //CONTINUE: INSERT THE TRIALS IN BETWEEN
    var bkgd_array = fillArray(bkgd_stim, num_bkgd_trial)
    var tg_array = fillArray(tg_stim, num_tg_trial)

    var randomized_bkgd_tg_array = bkgd_array.concat(tg_array)
    shuffleArray(randomized_bkgd_tg_array)


    gap_filled_array = [] // the array that with one item in between every dvt stimuli

    for (var i = 0; i < stim_array.length; i++){
            var current_dvt = stim_array[i]
            gap_filled_array.push(current_dvt)
            // because we have already shuffled the array, so we can just pop from the last
            var filler_item = randomized_bkgd_tg_array.pop()
            gap_filled_array.push(filler_item)
    }

        // generate an array that indicates how many items go into each blank space
        // the number here keep track of the number of elements in the filler array
        // number of gaps is 1 greater than the length of array
    var tracker_array = generate_random_num_array(randomized_bkgd_tg_array.length, gap_filled_array.length + 1)



    // just double check the number are alright
    var sum_array = tracker_array.reduce(function(a, b){
        return a + b;
        }, 0);

        if (sum_array != randomized_bkgd_tg_array.length){
            alert("Problem in create_all_simple_stimuli, the sum of tracker array does not equal to the actual length of the item to be filled")
        } else if (gap_filled_array.length + 1 != tracker_array.length){
            alert("Problem in create_all_simple_stimuli, the number of item in the tracker_array does not correspond to the number of actual gaps to be filled")
        }

        // finally fill in remaining

    var final_randomized_stimuli = []
     for (var i = 0; i < tracker_array.length; i++){
            current_chunk = pop_multiple(randomized_bkgd_tg_array,tracker_array[i])
            final_randomized_stimuli = final_randomized_stimuli.concat(current_chunk)

            if (i < gap_filled_array.length){
                final_randomized_stimuli.push(gap_filled_array[i])
            }

        }

        //console.log(final_randomized_block)

    var task_info = {
        type: type,
        background: bkgd_stim,
        target: tg_stim,
        deviant: dvt_stim_selected,
        blocks_info: final_randomized_stimuli,
        remaining_stimuli:meta_stimuli_path
    }

    return(task_info)

}




// currently assuming everyone sees different stimulus as target and background, need to double check with authors
// assuming same tg and bckgd across 5 blocks, only varying the dvt
// The deviant stimuli in each of the tasks were only shown one time each.==> unique across three tasks?
// meta_stimuli_path will keep track of all the stimuli that have not been selected
// return an object with the background / target / deviant stimuli/ stimuli sequence for the task as well as the remaining unselected stimuli
function create_all_stimuli(meta_stimuli_path,
                            type,
                                    n_trial = 250,
                                    n_block = 5,
                                    bkgd_freq = 0.7,
                                    tg_freq = 0.15,
                                    dvt_freq = 0.15){



    // calculate total number of unique deviant stimuli needed
    //var num_bkgd_stimuli = n_trial * bkgd_freq
    var num_dvt_stimuli = Math.ceil(n_trial * dvt_freq)
    var max_num_per_block = Math.ceil(num_dvt_stimuli / n_block)
    var min_num_per_block = num_dvt_stimuli % n_block
    var n_max_block = Math.floor(num_dvt_stimuli / n_block)
    var n_min_block = n_block - n_max_block

    var bkgd_tg_array // array
    var bkgd_stim; //str
    var tg_stim; //str

    var dvt_array; //array

    if (type === "all_simple"){
        console.log("all_simple")
        bkgd_tg_array = get_from_stimuli("simple",NUM_SIMPLE_STIMULI, meta_stimuli_path)
        //choose from full

    }else if(type === "all_complex"){
        bkgd_tg_array = get_from_stimuli("complex",NUM_COMPLEX_STIMULI, meta_stimuli_path)
    }else if(type === "mixed_simple_deviant"){
        bkgd_tg_array = get_from_stimuli("complex",NUM_COMPLEX_STIMULI, meta_stimuli_path)
    }else if (type === "mixed_complex_deviant"){
        bkgd_tg_array = get_from_stimuli("simple", NUM_SIMPLE_STIMULI, meta_stimuli_path)
    }else{(
        alert("wrong type in create_all_stimuli!")
    )}

    // randomly select one as bckgrd stimulus
    bkgd_stim = bkgd_tg_array[Math.floor(Math.random() * bkgd_tg_array.length)]

    // drop this one from both the bkgd_tg array and the metaarray so we don't repeat
    var meta_stimuli_index = meta_stimuli_path.indexOf(bkgd_stim);
    var bkgd_tg_array_index = bkgd_tg_array.indexOf(bkgd_stim)
    if (bkgd_tg_array_index > -1){
        bkgd_tg_array.splice(bkgd_tg_array_index,1)
    }else{
        alert("index error in create_all_stimuli!")
    }

    if (meta_stimuli_index > -1){
        meta_stimuli_path.splice(meta_stimuli_index, 1);
    }



    // randomly select another one as tg stimulus
    tg_stim = bkgd_tg_array[Math.floor(Math.random() * bkgd_tg_array.length)]

    // drop this one both the bkgd_tg array and the metaarray so we don't repeat
    meta_stimuli_index = meta_stimuli_path.indexOf(tg_stim);
    bkgd_tg_array_index = bkgd_tg_array.indexOf(tg_stim)
    if (bkgd_tg_array_index > -1){
        bkgd_tg_array.splice(bkgd_tg_array_index, 1)
    }else{
        alert("index error in create_all_simple_stimuli!")
    }

    if (meta_stimuli_index > -1){
        meta_stimuli_path.splice(meta_stimuli_index, 1);
    }




    // randomly select the dvt stimuli
    // current parameter should lead to 38[8, 8, 8, 8, 6]

    if (type === "all_simple" | type === "all_complex"){
        dvt_stim_selected = getRandomSubarray(bkgd_tg_array, num_dvt_stimuli)
    }else if(type === "mixed_simple_deviant"){
        // If type mixed get from simple array
        simple_stimuli_for_mixed = get_from_stimuli("simple",NUM_SIMPLE_STIMULI, meta_stimuli_path)
        dvt_stim_selected = getRandomSubarray(simple_stimuli_for_mixed, num_dvt_stimuli)
    }else if (type === "mixed_complex_deviant"){
        complex_stimuli_for_mixed = get_from_stimuli("complex", NUM_COMPLEX_STIMULI, meta_stimuli_path)
        dvt_stim_selected = getRandomSubarray(complex_stimuli_for_mixed, num_dvt_stimuli)
    }


    // create an array of array to record block structure
    var block_stim_array = []

    dvt_stim = dvt_stim_selected

    // drop the selected array from meta array

    meta_stimuli_path = meta_stimuli_path.filter(function(item){
        return dvt_stim.indexOf(item) === -1
    })


    for (var i = 0; i < n_block; i ++){
        current_block = []



            //get max number of stimuli from array
        current_block_dvt_stim = getRandomSubarray(dvt_stim, max_num_per_block)

        block_stim_array.push(current_block_dvt_stim)

            //get rid of the chosen stimuli to prevent double selection
        dvt_stim = dvt_stim.filter(function(item){
                return current_block_dvt_stim.indexOf(item) === -1; // not in the sampled array
            })


    }


    // next randomize each block

    randomized_blocks = []
    for (var b = 0; b < block_stim_array.length; b++){

    // this is a little bit indirect. because we don't want to have two consecutive dvt stimuli, so we will first insert one random tgt or bkgd in between each pair of dvt stimuli
        var current_block = block_stim_array[b]

        // first create corresponding dvt and tgt list, corresponding lengths
        var num_bkgd = bkgd_freq * (n_trial / n_block)
        var num_tg = (n_trial / n_block) - num_bkgd - current_block.length

        var bkgd_array = fillArray(bkgd_stim, num_bkgd)
        var tg_array = fillArray(tg_stim, num_tg)

        /*
        console.log("bkgd_array")
        console.log(bkgd_array)
        console.log("tg_array")
        console.log(tg_array)
        */

        var randomized_bkgd_tg_array = bkgd_array.concat(tg_array)
        shuffleArray(randomized_bkgd_tg_array)



        // then randomly insert tgt and bgkrd in between
        gap_filled_array = [] // the array that with one item in between every dvt stimuli

        for (var i = 0; i < current_block.length; i++){
            var current_dvt = current_block[i]
            gap_filled_array.push(current_dvt)
            // because we have already shuffled the array, so we can just pop from the last
            var filler_item = randomized_bkgd_tg_array.pop()
            gap_filled_array.push(filler_item)
        }


        // generate an array that indicates how many items go into each blank space
        // the number here keep track of the number of elements in the filler array
        // number of gaps is 1 greater than the length of array
        var tracker_array = generate_random_num_array(randomized_bkgd_tg_array.length, gap_filled_array.length + 1)


        // just double check the sum of array is correct

        var sum_array = tracker_array.reduce(function(a, b){
        return a + b;
        }, 0);

        if (sum_array != randomized_bkgd_tg_array.length){
            alert("Problem in create_all_simple_stimuli, the sum of tracker array does not equal to the actual length of the item to be filled")
        } else if (gap_filled_array.length + 1 != tracker_array.length){
            alert("Problem in create_all_simple_stimuli, the number of item in the tracker_array does not correspond to the number of actual gaps to be filled")
        }

        // finally fill in remaining
        var final_randomized_block = []
        for (var i = 0; i < tracker_array.length; i++){
            current_chunk = pop_multiple(randomized_bkgd_tg_array,tracker_array[i])
            final_randomized_block = final_randomized_block.concat(current_chunk)

            if (i < gap_filled_array.length){
                final_randomized_block.push(gap_filled_array[i])
            }

        }

        //console.log(final_randomized_block)

        randomized_blocks.push(final_randomized_block)
    }

    // finally, shuffle blocks
    shuffleArray(randomized_blocks)

    var task_info = {
        type: type,
        background: bkgd_stim,
        target: tg_stim,
        deviant: dvt_stim_selected,
        blocks_info: randomized_blocks,
        remaining_stimuli:meta_stimuli_path
    }
    return(task_info)


}

function convert_path_to_timeline_variables(item_array){
    var timeline_variable = []
    for (var i = 0; i < item_array.length; i++){
        timeline_variable.push({
            pic: item_array[i]
        })
    }
    return timeline_variable
}
