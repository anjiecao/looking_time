
function get_block_information(all_stimuli, fam_trial_params = [1, 3, 9]){

    all_block_info = []
    block_type = ["all_background", "deviant"]

    // grab each pair in an object things 
    // each of the pair is now in a subarray 
    all_pairs = packNeighboringElements(all_stimuli)
    console.log(all_pairs)
    for (var i = 0; i < all_pairs.length; i++){
        pair = all_pairs[i]
        shuffleArray(pair)
        block_info = {
            background: pair[0], 
            deviant: pair[1]
        }
        all_block_info.push(block_info)

    }

    shuffleArray(all_block_info)

    for (var pair_type_index = 0; pair_type_index < block_type.length; pair_type_index++){
        for (var fam_trial_index = 0; fam_trial_index < fam_trial_params.length; fam_trial_index++){
            // 0, 0 // 0, 1 // 0, 2 // 1, 0 // 1, 1 // 1, 2
            // 0    // 1    // 2    // 3    // 4   // 5 
            
            block_index = pair_type_index * 3 + fam_trial_index
            all_block_info[block_index].block_type = block_type[pair_type_index]
            all_block_info[block_index].fam_trial = fam_trial_params[fam_trial_index]


        }
    }


    return all_block_info


}


function generate_block(block_info, familiarization_time){
    
    block = []
    // generate familiarization phase 
    for (var i = 0; i < block_info.fam_trial; i++){
        trial = {
            type: curtainDisplay, 
            stimulus: generate_html_string_for_stimulus(block_info.background), 
            valid_key_press: [" "],
            familiarization_time: familiarization_time, 
            familiarization_phase: true, 
            data: block_info
          }
        block.push(trial)
    }

    // generate test phase 
    test_stimulus = (block_info.block_type == "deviant") ? block_info.deviant : block_info.background
    trial = {
        type: curtainDisplay, 
        stimulus: generate_html_string_for_stimulus(test_stimulus), 
        valid_key_press: [" "],
        familiarization_time: familiarization_time, 
        familiarization_phase: false, 
        data: block_info
    }

    block.push(trial)

    
    var filler_trial = {
        type: jsPsychSurveyLikert,
        preamble: generate_html_string_for_filler_task(test_stimulus),
        questions: [
          {
            prompt: "How curious are you about this animation?", 
            labels: ["Not at all curious", 
            "A little curious", 
            "Somewhat curious", 
            "Pretty curious", "Very Curious"],
            required: true
          }
        ],
        data: {
            rating_type: "background"
        }
      }

    block.push(filler_trial)
    return block

}



function generate_all_blocks(all_blocks_info, familiarization_time){
    all_blocks = []
    for (var i= 0; i < all_blocks_info.length; i++){
        block = generate_block(all_blocks_info[i], familiarization_time)
        all_blocks.push(block)
        
    }
    shuffleArray(all_blocks)
    all_blocks = all_blocks.flat()
    console.log(all_blocks)
    return (all_blocks)
}





/* 
function generate_block(block_info){


    if(block_info.block_type == "background_block"){
        console.log(block_info)

        filler_trial_html = generate_html_string_for_filler_task(block_info.background_type, block_info.background_stimulus)
        // generate all trials
        block = []
        for (var i = 0; i < block_info.trial_number; i++){
            trial = {
                type: curtainDisplay, 
                stimulus: generate_html_string_for_stimulus(block_info.background_type, block_info.background_stimulus), 
                valid_key_press: [" "],
                data: block_info
              }
              block.push(trial)
        }

        var filler_trial = {
            type: jsPsychSurveyLikert,
            preamble: filler_trial_html,
            questions: [
              {
                prompt: "How curious are you about this animation?", 
                labels: ["Not at all curious", 
                "A little curious", 
                "Somewhat curious", 
                "Pretty curious", "Very Curious"],
                rrequired: true
              }
            ],
            data: {
                rating_type: "background"
            }
          }
        
        block.push(filler_trial)
        console.log(block)

  
    }else{
       
        rating_stimuli_type = getRandomSubarray(["background", "deviant"],1)[0]
        if (rating_stimuli_type == "background"){
            filler_trial_html = generate_html_string_for_filler_task(block_info.background_type, block_info.background_stimulus)
        }else{
            filler_trial_html = generate_html_string_for_filler_task(block_info.deviant_type, block_info.deviant_stimulus)
        }

        // generate all background
        block = []
        for (var i = 0; i < block_info.trial_number-1; i++){
            trial = {
                type: curtainDisplay, 
                stimulus:  generate_html_string_for_stimulus(block_info.background_type, block_info.background_stimulus), 
                valid_key_press: [" "],
                data: block_info
              }
              block.push(trial)
        }
        // add deviant at the end
        trial = {
            type: curtainDisplay, 
            stimulus: generate_html_string_for_stimulus(block_info.deviant_type, block_info.deviant_stimulus), 
            valid_key_press: [" "],
            data: block_info
        }
        block.push(trial)

        // add filler task 
        var filler_trial = {
            type: jsPsychSurveyLikert,
            preamble:  filler_trial_html,
            questions: [
              {
                prompt: "How curious are you about this animation?", 
                labels: ["Not at all curious", 
                "A little curious", 
                "Somewhat curious", 
                "Pretty curious", "Very Curious"],
                required: true
              }
            ],
            data: {
                rating_type: rating_stimuli_type
            }
          }
          block.push(filler_trial)
          

  
    }
    return (block)


}
*/

// loop through all combo and create blocks 

function generate_html_string_for_stimulus(stimulus){

    s = "<img src = '" + stimulus + "' style = 'width:800px; height:800px'>"

    return(s)
 }
 
 

function generate_html_string_for_filler_task(stimulus){
   

    var top_position = 20
    var left_postion = 46
    
    //s = "<img src = '" + stimulus + "' style = 'width:100px; height:100px; position:fixed; top:" + top_position + '%;\
    //transform: translate(-50%, -50%);left:' + left_postion + '%"></img>'
    s = "<img src = '" + stimulus + "' style = 'width:650px; height:650px'>"
    return(s)
 }
 




