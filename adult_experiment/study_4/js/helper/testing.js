function check_no_duplciate(ALL_FAM_NOVEL_PAIRS){

    flat_pairs = ALL_FAM_NOVEL_PAIRS.flat()
    if(hasDuplicates(flat_pairs)){
        console.log("has duplicated pairs!")
    }else{
        console.log("no duplicated pairs!")
    }
}

function check_all_blocks(all_blocks){

    all_stimuli_in_blocks = []
    for (var b = 0; b < all_blocks.length; b++){
        current_block = all_blocks[b]
        paired_trial = current_block[3] // sorry about the magic number that's how it is packaged
        
        all_stimuli_in_blocks.push(paired_trial.data.left_stimulus_raw)
        all_stimuli_in_blocks.push(paired_trial.data.right_stimulus_raw)
    }

    if(hasDuplicates(all_stimuli_in_blocks)){
        console.log("has duplicated pairs in blocks!")
    }else{
        console.log("no duplicated pairs in blocks!")
    }
    
}

function check_block_pref_rating_stimui(all_blocks, all_ratings){

    all_pref_rating_pairs = all_ratings.map(x => [x.data.left_stimulus_raw, x.data.right_stimulus_raw]).flat()
    all_stimuli_in_blocks = []
    for (var b = 0; b < all_blocks.length; b++){
        current_block = all_blocks[b]
        paired_trial = current_block[3] // sorry about the magic number that's how it is packaged
        
        all_stimuli_in_blocks.push(paired_trial.data.left_stimulus_raw)
        all_stimuli_in_blocks.push(paired_trial.data.right_stimulus_raw)
    }

    if(all_pref_rating_pairs.sort().join(',')=== all_stimuli_in_blocks.sort().join(',')){
        console.log("pref rating and block has the same members")
    }else  console.log("pref rating and block DOES NOT have the same members")



}

