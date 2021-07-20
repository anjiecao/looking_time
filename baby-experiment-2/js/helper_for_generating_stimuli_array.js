// ---------- General Helper functions ---------- //

// function returning an object with the frequency of it occurrences in the array


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


// -------- V2 dealing with Stimuli --------- //
// currently ignoring inter-relationship between stimuli
// just get all stimuli
function get_all_stimuli(TEST_RUN){


    all_simple_stimuli = []
    all_complex_stimuli = []

    MAIN_DIR = "stimuli/images/spore_stims/"

    if (TEST_RUN == 1) {
      simple_species = Array.from({length: 4}, (_, i) => i + 1)
      complex_species = Array.from({length: 4}, (_, i) => i + 1)

    }
    else {
      simple_species = Array.from({length: 12}, (_, i) => i + 1)
      complex_species = Array.from({length: 12}, (_, i) => i + 1)

    }



    // set number is specified in experiment.html
      for (var j = 0; j < simple_species.length; j++){

          // add 0's before number for species number less than 0
          if (simple_species[j] < 10) {
            current_simple_species = '0' + simple_species[j]
            current_complex_species = '0' + complex_species[j]

          }
          else {
            current_simple_species = simple_species[j]
            current_complex_species = complex_species[j]
          }

          current_simple_stimulus = MAIN_DIR + 'simple_' + current_simple_species + "_A.gif"
          current_complex_stimulus = MAIN_DIR + 'complex_' + current_complex_species + "_A.gif"

          all_simple_stimuli.push(current_simple_stimulus)
          all_complex_stimuli.push(current_complex_stimulus)
         }

         all_stimuli = {
             simple_stimuli: all_simple_stimuli,
             complex_stimuli: all_complex_stimuli
         }

    // put creatures in pairs
    return (all_stimuli)
}

function generate_all_block(subject_num,
                            num_blocks,
                            num_trial_per_block,
                            stimuli_array,
                            num_species){

    // check that number of blocks is divisible by 2
    if (num_blocks % 2 != 0){
      throw 'Number of blocks should be divisible by 2, to have equal number of each block type';
    }

    counterbalancing_table = [{"fam_duration":["3","3","5","5","5","5","3","3"],"complexity":["simple","simple","complex","simple","complex","simple","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[1,2,8,3,7,4,6,5]},{"fam_duration":["3","5","3","5","5","3","5","3"],"complexity":["simple","simple","simple","simple","complex","complex","complex","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[2,3,1,4,8,5,7,6]},{"fam_duration":["5","5","3","3","3","3","5","5"],"complexity":["simple","simple","simple","complex","simple","complex","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[3,4,2,5,1,6,8,7]},{"fam_duration":["5","3","5","3","3","5","3","5"],"complexity":["simple","complex","simple","complex","simple","complex","simple","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[4,5,3,6,2,7,1,8]},{"fam_duration":["3","3","5","5","5","5","3","3"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]},{"fam_duration":["3","5","3","5","5","3","5","3"],"complexity":["complex","complex","complex","complex","simple","simple","simple","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[6,7,5,8,4,1,3,2]},{"fam_duration":["5","5","3","3","3","3","5","5"],"complexity":["complex","complex","complex","simple","complex","simple","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[7,8,6,1,5,2,4,3]},{"fam_duration":["5","3","5","3","3","5","3","5"],"complexity":["complex","simple","complex","simple","complex","simple","complex","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[8,1,7,2,6,3,5,4]},{"fam_duration":["3","3","5","5","5","5","3","3"],"complexity":["simple","simple","complex","simple","complex","simple","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[1,2,8,3,7,4,6,5]},{"fam_duration":["3","5","3","5","5","3","5","3"],"complexity":["simple","simple","simple","simple","complex","complex","complex","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[2,3,1,4,8,5,7,6]},{"fam_duration":["5","5","3","3","3","3","5","5"],"complexity":["simple","simple","simple","complex","simple","complex","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[3,4,2,5,1,6,8,7]},{"fam_duration":["5","3","5","3","3","5","3","5"],"complexity":["simple","complex","simple","complex","simple","complex","simple","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[4,5,3,6,2,7,1,8]},{"fam_duration":["3","3","5","5","5","5","3","3"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]},{"fam_duration":["3","5","3","5","5","3","5","3"],"complexity":["complex","complex","complex","complex","simple","simple","simple","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[6,7,5,8,4,1,3,2]},{"fam_duration":["5","5","3","3","3","3","5","5"],"complexity":["complex","complex","complex","simple","complex","simple","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[7,8,6,1,5,2,4,3]},{"fam_duration":["5","3","5","3","3","5","3","5"],"complexity":["complex","simple","complex","simple","complex","simple","complex","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[8,1,7,2,6,3,5,4]},{"fam_duration":["5","5","3","3","3","3","5","5"],"complexity":["complex","complex","complex","simple","complex","simple","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[7,8,6,1,5,2,4,3]},{"fam_duration":["3","3","5","5","5","5","3","3"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]},{"fam_duration":["5","3","5","3","3","5","3","5"],"complexity":["complex","simple","complex","simple","complex","simple","complex","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[8,1,7,2,6,3,5,4]},{"fam_duration":["3","5","3","5","5","3","5","3"],"complexity":["complex","complex","complex","complex","simple","simple","simple","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["35","35","35","35","35","35","35","35"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[6,7,5,8,4,1,3,2]},{"fam_duration":["5","5","7","7","7","7","5","5"],"complexity":["simple","simple","complex","simple","complex","simple","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[1,2,8,3,7,4,6,5]},{"fam_duration":["5","7","5","7","7","5","7","5"],"complexity":["simple","simple","simple","simple","complex","complex","complex","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[2,3,1,4,8,5,7,6]},{"fam_duration":["7","7","5","5","5","5","7","7"],"complexity":["simple","simple","simple","complex","simple","complex","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[3,4,2,5,1,6,8,7]},{"fam_duration":["7","5","7","5","5","7","5","7"],"complexity":["simple","complex","simple","complex","simple","complex","simple","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[4,5,3,6,2,7,1,8]},{"fam_duration":["5","5","7","7","7","7","5","5"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]},{"fam_duration":["5","7","5","7","7","5","7","5"],"complexity":["complex","complex","complex","complex","simple","simple","simple","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[6,7,5,8,4,1,3,2]},{"fam_duration":["7","7","5","5","5","5","7","7"],"complexity":["complex","complex","complex","simple","complex","simple","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[7,8,6,1,5,2,4,3]},{"fam_duration":["7","5","7","5","5","7","5","7"],"complexity":["complex","simple","complex","simple","complex","simple","complex","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[8,1,7,2,6,3,5,4]},{"fam_duration":["5","5","7","7","7","7","5","5"],"complexity":["simple","simple","complex","simple","complex","simple","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[1,2,8,3,7,4,6,5]},{"fam_duration":["5","7","5","7","7","5","7","5"],"complexity":["simple","simple","simple","simple","complex","complex","complex","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[2,3,1,4,8,5,7,6]},{"fam_duration":["7","7","5","5","5","5","7","7"],"complexity":["simple","simple","simple","complex","simple","complex","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[3,4,2,5,1,6,8,7]},{"fam_duration":["7","5","7","5","5","7","5","7"],"complexity":["simple","complex","simple","complex","simple","complex","simple","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[4,5,3,6,2,7,1,8]},{"fam_duration":["5","5","7","7","7","7","5","5"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]},{"fam_duration":["5","7","5","7","7","5","7","5"],"complexity":["complex","complex","complex","complex","simple","simple","simple","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[6,7,5,8,4,1,3,2]},{"fam_duration":["7","7","5","5","5","5","7","7"],"complexity":["complex","complex","complex","simple","complex","simple","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[7,8,6,1,5,2,4,3]},{"fam_duration":["7","5","7","5","5","7","5","7"],"complexity":["complex","simple","complex","simple","complex","simple","complex","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[8,1,7,2,6,3,5,4]},{"fam_duration":["7","5","7","5","5","7","5","7"],"complexity":["simple","complex","simple","complex","simple","complex","simple","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[4,5,3,6,2,7,1,8]},{"fam_duration":["5","7","5","7","7","5","7","5"],"complexity":["simple","simple","simple","simple","complex","complex","complex","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[2,3,1,4,8,5,7,6]},{"fam_duration":["7","7","5","5","5","5","7","7"],"complexity":["simple","simple","simple","complex","simple","complex","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[3,4,2,5,1,6,8,7]},{"fam_duration":["5","5","7","7","7","7","5","5"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["57","57","57","57","57","57","57","57"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]},{"fam_duration":["3","3","7","7","7","7","3","3"],"complexity":["simple","simple","complex","simple","complex","simple","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[1,2,8,3,7,4,6,5]},{"fam_duration":["3","7","3","7","7","3","7","3"],"complexity":["simple","simple","simple","simple","complex","complex","complex","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[2,3,1,4,8,5,7,6]},{"fam_duration":["7","7","3","3","3","3","7","7"],"complexity":["simple","simple","simple","complex","simple","complex","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[3,4,2,5,1,6,8,7]},{"fam_duration":["7","3","7","3","3","7","3","7"],"complexity":["simple","complex","simple","complex","simple","complex","simple","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[4,5,3,6,2,7,1,8]},{"fam_duration":["3","3","7","7","7","7","3","3"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]},{"fam_duration":["3","7","3","7","7","3","7","3"],"complexity":["complex","complex","complex","complex","simple","simple","simple","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[6,7,5,8,4,1,3,2]},{"fam_duration":["7","7","3","3","3","3","7","7"],"complexity":["complex","complex","complex","simple","complex","simple","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[7,8,6,1,5,2,4,3]},{"fam_duration":["7","3","7","3","3","7","3","7"],"complexity":["complex","simple","complex","simple","complex","simple","complex","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[8,1,7,2,6,3,5,4]},{"fam_duration":["3","3","7","7","7","7","3","3"],"complexity":["simple","simple","complex","simple","complex","simple","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[1,2,8,3,7,4,6,5]},{"fam_duration":["3","7","3","7","7","3","7","3"],"complexity":["simple","simple","simple","simple","complex","complex","complex","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[2,3,1,4,8,5,7,6]},{"fam_duration":["7","7","3","3","3","3","7","7"],"complexity":["simple","simple","simple","complex","simple","complex","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[3,4,2,5,1,6,8,7]},{"fam_duration":["7","3","7","3","3","7","3","7"],"complexity":["simple","complex","simple","complex","simple","complex","simple","complex"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[4,5,3,6,2,7,1,8]},{"fam_duration":["3","3","7","7","7","7","3","3"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]},{"fam_duration":["3","7","3","7","7","3","7","3"],"complexity":["complex","complex","complex","complex","simple","simple","simple","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[6,7,5,8,4,1,3,2]},{"fam_duration":["7","7","3","3","3","3","7","7"],"complexity":["complex","complex","complex","simple","complex","simple","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[7,8,6,1,5,2,4,3]},{"fam_duration":["7","3","7","3","3","7","3","7"],"complexity":["complex","simple","complex","simple","complex","simple","complex","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[8,1,7,2,6,3,5,4]},{"fam_duration":["7","7","3","3","3","3","7","7"],"complexity":["simple","simple","simple","complex","simple","complex","complex","complex"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[3,4,2,5,1,6,8,7]},{"fam_duration":["3","7","3","7","7","3","7","3"],"complexity":["complex","complex","complex","complex","simple","simple","simple","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[6,7,5,8,4,1,3,2]},{"fam_duration":["7","3","7","3","3","7","3","7"],"complexity":["complex","simple","complex","simple","complex","simple","complex","simple"],"block_type":["Dev","Std","Std","Dev","Dev","Std","Std","Dev"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[8,1,7,2,6,3,5,4]},{"fam_duration":["3","3","7","7","7","7","3","3"],"complexity":["complex","complex","simple","complex","simple","complex","simple","simple"],"block_type":["Std","Dev","Dev","Std","Std","Dev","Dev","Std"],"fam_duration_condition":["37","37","37","37","37","37","37","37"],"block_number":[1,2,3,4,5,6,7,8],"counterbalancing_condition":[5,6,4,7,3,8,2,1]}]



    fam_orders = counterbalancing_table[subject_num].fam_duration
    block_orders = counterbalancing_table[subject_num].block_type
    complexity_orders = counterbalancing_table[subject_num].complexity

    console.log('block_orders')
    console.log(block_orders)

    console.log('fam_orders')
    console.log(fam_orders)

    // random order of pairs
    simple_pairs = [0,2,4,6]
    complex_pairs = [0,2,4,6]

    shuffleArray(simple_pairs)
    shuffleArray(complex_pairs)

    console.log('simple pairs')
    console.log(simple_pairs)



    // stimuli_array
    simple_stimuli = stimuli_array['simple_stimuli']
    complex_stimuli = stimuli_array['complex_stimuli']


    console.log(simple_stimuli)
    console.log(complex_stimuli)

    // get paths to all background stimuli
    backgrounds = []
    deviants = []

    // counters
    simple_counter = 0
    complex_counter = 0

    // shifts
    background_shifts = Array.from({length: num_blocks}, () => Math.floor(Math.random() * 2));
    deviant_shifts = Array()

    for (var i = 0; i < background_shifts.length; i++) {
      // backgrounds are opposite shift
      deviant_shifts.push(Math.abs(background_shifts[i]-1))

      if (complexity_orders[i] == 'simple'){

        backgrounds.push(simple_stimuli[simple_pairs[simple_counter] + background_shifts[i]])
        deviants.push(simple_stimuli[simple_pairs[simple_counter]  + deviant_shifts[i]])

        simple_counter = simple_counter + 1

      }
      else if (complexity_orders[i] == 'complex') {
        backgrounds.push(complex_stimuli[complex_pairs[complex_counter] + background_shifts[i]])
        deviants.push(complex_stimuli[complex_pairs[complex_counter] + deviant_shifts[i]])

        complex_counter = complex_counter + 1
      }
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
          complexity: complexity_orders[i]
      }

     all_block_information.push(block_information)
  }

  console.log('all_block_information')
    console.log(all_block_information)

    return (all_block_information)

}
                                                                                                                                                                                                                                                                                                                                                                    // -------- V2 generate timeline variable for each bl
function generate_timeline_variables(block_information){

  console.log('block_information')

    console.log(block_information)

    background_stimuli = block_information.background_stimuli
    deviant_stimuli = block_information.deviant_stimuli
    block_length = block_information.fam_duration
    block_type = block_information.block_type
    fam_duration = block_information.fam_duration
    complexity = block_information.complexity

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

     console.log('background_item')
     console.log(background_item)


    block_stimuli = fillArray(background_item, block_length)

    console.log('block_stimuli')
    console.log(block_stimuli)

    if (block_type == 'Dev'){
      block_stimuli[block_length] = deviant_item // replace last with deviant
    }
    else if (block_type = 'Std') {
      block_stimuli[block_length] = standard_item_last // don't replace but set trial duration to null for indefinite looking
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
          stimuli: background_stimuli,
          stim_type: 'background',
          trial_duration: 6000,
          music: music_fam_array[i],
          inter_trial: 'stimuli/images/blank_fam.png',
          fam_duration: fam_duration,
          complexity: complexity

        }
      }

    if (block_type == 'Dev'){
      block_stimuli[block_length] = {
          stimuli: deviant_stimuli,
          stim_type: 'deviant',
          trial_duration: null,
          music: music_test_array[1],
          inter_trial: 'stimuli/images/blank_test.png',
          fam_duration: fam_duration,
          complexity: complexity
      }
    }

    else if (block_type = 'Std') {
      block_stimuli[block_length] = {
          stimuli: background_stimuli,
          stim_type: 'background',
          trial_duration: null,
          music: music_test_array[1],
          inter_trial: 'stimuli/images/blank_test.png',
          fam_duration: fam_duration,
          complexity: complexity
      }
    }

    return (block_stimuli)

}

// -------- V2 generate all blocks combination --------- //
