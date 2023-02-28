
function get_block_filler(current_block_n, total_block_n){

    return 
}


function create_block_structure(all_similarity_rating, all_complexity_rating, trial_n){

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

    console.log(complexity_blocks)
    console.log(similarity_blocks)
    


}