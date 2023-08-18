//pack neighboring array 
function packNeighboringElements(arr) {
  const packedArray = [];
  
  for (let i = 0; i < arr.length; i += 2) {
    if (i + 1 < arr.length) {
      packedArray.push([arr[i], arr[i + 1]]);
    } else {
      packedArray.push([arr[i]]);
    }
  }
  
  return packedArray;
}



// remove an array from an array of array
// assuming no duplicate elements in the array of array  
function removeArrayFromArray(arr, arrOfarr){
    remove_id = 999999
    for (var i = 0; i < arrOfarr.length; i++){
      current_arr = arrOfarr[i]
      for (var e = 0; e < current_arr.length; e++){
        if (arr.indexOf(current_arr[e]) != -1){
          remove_id = i
        }
      }
    }
    new_array = arrOfarr.splice(remove_id, 1)
    return(new_array)
}

// get random subarray 
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


// check if the array has duplicates 
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}


// This function finds if two arrays have one common element 
function findCommonElement(array1, array2) {
      
  // Loop for array1
  for(let i = 0; i < array1.length; i++) {
        
      // Loop for array2
      for(let j = 0; j < array2.length; j++) {
            
          // Compare the element of each and
          // every element from both of the
          // arrays
          if(array1[i] === array2[j]) {
            
              // Return if common element found
              return true;
          }
      }
  }
    
  // Return if no common element exist
  return false; 
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


// function returning an object with the frequency of it occurrences in the array

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


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

