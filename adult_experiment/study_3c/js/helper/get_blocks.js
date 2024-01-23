
function reorder_all_blocks(all_blocks_info){

    all_background_blocks = all_blocks_info.filter(item => item.violation_type == null)
    all_identity_blocks = all_blocks_info.filter(item => item.violation_type == "identity")
    all_animacy_blocks = all_blocks_info.filter(item => item.violation_type == "animacy")
    all_number_blocks = all_blocks_info.filter(item => item.violation_type == "number")
    all_pose_blocks = all_blocks_info.filter(item => item.violation_type == "pose")

    // 4 groups in total, each group has 2 background, 1 identity, 1 animacy, 1 number, 1 pose
    
    all_block_groups = []
    for (var i in [0, 1, 2, 3]){
        current_block_group = []

        current_block_group.push(all_background_blocks.pop())
        current_block_group.push(all_background_blocks.pop())
        current_block_group.push(all_identity_blocks.pop())
        current_block_group.push(all_animacy_blocks.pop())
        current_block_group.push(all_number_blocks.pop())
        current_block_group.push(all_pose_blocks.pop())

        shuffleArray(current_block_group)
        all_block_groups.push(current_block_group)

    }

    all_block_groups = all_block_groups.flat()
    return(all_block_groups)

}



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

        filler_trial_html = generate_html_string_for_filler_task( block_info.memory_test_stimulus)
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
            type: jsPsychSurveyMultiChoice,

        
            preamble:  filler_trial_html,
            questions: [
              {prompt:
                      'Have you seen this before?', 
               options: ["Yes", "No"], 
               required: true, 
               horizontal: true},
            ],
            data: {stimulus_type: 'memory_test',
                    memory_test_type: block_info.memory_test_type, 
                memory_test_stimulus: block_info.memory_test_stimulus},
          }

        
        block.push(filler_trial)

  
    }else{
       
        rating_stimuli_type = getRandomSubarray(["background", "deviant"],1)[0]
        if (rating_stimuli_type == "background"){
            filler_trial_html = generate_html_string_for_filler_task(block_info.memory_test_stimulus)
        }else{
            filler_trial_html = generate_html_string_for_filler_task(block_info.memory_test_stimulus)
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
            type: jsPsychSurveyMultiChoice,
            preamble:  filler_trial_html,
            questions: [
              {prompt:
                      'Have you seen this before?', 
               options: ["Yes", "No"], 
               required: true, 
               horizontal: true},
            ],
            data: {stimulus_type: 'memory_test',
            memory_test_type: block_info.memory_test_type, 
            memory_test_stimulus: block_info.memory_test_stimulus},
          }

          block.push(filler_trial)
          

  
    }
    return (block)


}


// loop through all combo and create blocks 

function generate_html_string_for_stimulus(stimulus_type, stimulus_string){

   

    var top_position = getRandomInt(35, 65)
    var left_postion = getRandomInt(40, 60)
    
    
    if(stimulus_type.includes("pair")){
        s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
            transform: translate(-50%, -50%);left:' + (left_postion-4) + '%"></img>' + 
            '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position  + '%;\
            transform: translate(-50%, -50%);left:' + (left_postion+4)+ '%">'
    }else{
        s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
        transform: translate(-50%, -50%);left:' + left_postion + '%"></img>'

    }

    return(s)
 }
 
 

function generate_html_string_for_filler_task(stimulus_string){
   

    var top_position = 20
    var left_postion = 46
    
    
    s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;left:' + left_postion + '%"></img>'
        




    return(s)
 }
 




