
function get_block_filler(block, current_block_n, total_block_n){

    filler_trial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus:"",
        prompt: "<p>You have finished " + current_block_n +  " out of " + total_block_n + " blocks so far. Press any key to continue</p>",
      }

    block.push(filler_trial)

}


function create_block_structure(all_similarity_rating, all_complexity_rating, complexity_rating_anchor, trial_n){

    total_complexity_block_n = Math.floor(all_complexity_rating / trial_n)
    total_similarity_block_n = Math.floor(all_similarity_rating / trial_n)

    complexity_blocks = []
    for (var i = 0; i < all_complexity_rating.length; i += trial_n) {
        block = all_complexity_rating.slice(i, Math.min(all_complexity_rating.length, i + trial_n))
        complexity_blocks.push(block);
    }

    similarity_blocks = []
    for (var i = 0; i < all_similarity_rating.length; i += trial_n) {
        block = all_similarity_rating.slice(i, Math.min(all_similarity_rating.length, i + trial_n))
        similarity_blocks.push(block);
    }

    // dealing with extra's case
    if (complexity_blocks[complexity_blocks.length - 1].length != trial_n){
        last_two = complexity_blocks.splice(-2)
        combined = last_two[0].concat(last_two[1])
        complexity_blocks.push(combined)
    }

    if (similarity_blocks[similarity_blocks.length - 1].length != trial_n){
        last_two = similarity_blocks.splice(-2)
        combined = last_two[0].concat(last_two[1])
        similarity_blocks.push(combined)
    }

    all_blocks = complexity_blocks.concat(similarity_blocks)
    shuffleArray(all_blocks)
    
    total_block_n = all_blocks.length
    n_complexity_block = 0
    for (var i = 0; i < total_block_n; i++){
        // check if this is complexity block 
        if (typeof(all_blocks[i][0].choices) == "undefined"){
            n_complexity_block = n_complexity_block + 1
            if (n_complexity_block == 1){
                all_blocks[i] = complexity_rating_anchor.concat(all_blocks[i])
            }
        }

        current_block_n = i + 1
        get_block_filler(all_blocks[i], current_block_n, total_block_n)
    }
    return all_blocks.flat()
}