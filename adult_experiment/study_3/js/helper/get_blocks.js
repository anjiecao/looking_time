

function generate_all_blocks(all_blocks_info){
    all_blocks = []
    for (var i= 0; i < all_blocks_info.length; i++){
        block = generate_block(all_blocks_info[i])
        all_blocks = all_blocks.concat(block)
        
    }
    return (all_blocks)
}


function generate_block(block_info){


    if(block_info.block_type == "background_block"){
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
                "Pretty curious", "Very Curious"]
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
                "Pretty curious", "Very Curious"]
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


// loop through all combo and create blocks 

function generate_html_string_for_stimulus(stimulus_type, stimulus_string){
   

    var top_position = getRandomInt(45, 55)
    var left_postion = getRandomInt(45, 55)
    
    
    if(stimulus_type.includes("pair")){
        s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
            transform: translate(-50%, -50%);left:' + left_postion + '%"></img>'
            '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position  + '%;\
            transform: translate(-50%, -50%);left:' + (left_postion+6)+ '%">'
    }else{
        s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
        transform: translate(-50%, -50%);left:' + left_postion + '%"></img>'

    }

    return(s)
 }
 
 

function generate_html_string_for_filler_task(stimulus_type, stimulus_string){
   

    var top_position = 20
    var left_postion = 46
    
    
    if(stimulus_type.includes("pair")){
        s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
            transform: translate(-50%, -50%);left:' + (left_postion-3) + '%"></img>'+
            '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position  + '%;\
            transform: translate(-50%, -50%);left:' + (left_postion + 3) + '%">'
    }else{
        s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
        transform: translate(-50%, -50%);left:' + 46 + '%"></img>'
        


    }

    return(s)
 }
 




