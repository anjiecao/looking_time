
function reorder_all_blocks(all_blocks_info){

    exposure_duration_a  = [0, 1]
    exposure_duration_b  = [2, 3]
    exposure_duration_c = [4, 6]
    exposure_duration_d = [8, 9]

    exposure_duration_a_blocks = all_blocks_info.filter(item => item.exposure_duration == 0 || item.exposure_duration == 1)
    exposure_duration_b_blocks = all_blocks_info.filter(item => item.exposure_duration == 2 || item.exposure_duration == 3)
    exposure_duration_c_blocks = all_blocks_info.filter(item => item.exposure_duration == 4 || item.exposure_duration == 6)
    exposure_duration_d_blocks = all_blocks_info.filter(item => item.exposure_duration == 8 || item.exposure_duration == 9)
    console.log(all_blocks_info)
    console.log(exposure_duration_a_blocks)

    // 4 groups in total, each group has 2 background, 1 identity, 1 animacy, 1 number, 1 pose
    
    all_block_groups = []
    for (var i in [0, 1, 2, 3]){
        current_block_group = []

        current_block_group.push(exposure_duration_a_blocks.pop())
        current_block_group.push(exposure_duration_b_blocks.pop())
        current_block_group.push(exposure_duration_c_blocks.pop())
        current_block_group.push(exposure_duration_d_blocks.pop())
        shuffleArray(current_block_group)
        all_block_groups.push(current_block_group)
    }

    all_block_groups = all_block_groups.flat()
    return(all_block_groups)

}



function generate_all_blocks(all_blocks_info){
    all_blocks = []


    for (var i= 0; i < all_blocks_info.length; i++){
        
        block = generate_block(all_blocks_info[i], i)
        all_blocks = all_blocks.concat(block)
        
    }
    return (all_blocks)
}


function generate_block(block_info, block_id){


    // generate all background
    block = []
    block_info.block_id = block_id
    for (var i = 0; i < block_info.exposure_duration; i++){

        
        trial = {
                type: curtainDisplay, 
                stimulus:  generate_html_string_for_stimulus(block_info.background_stimulus),
                valid_key_press: [" "],
                data: block_info
              }
        block.push(trial)
        }
        // add deviant at the end
        trial = {
            type: curtainDisplay, 
            stimulus: generate_html_string_for_stimulus(block_info.deviant_stimulus), 
            valid_key_press: [" "],
            data: block_info
        }
        block.push(trial)

        // add filler task 
        var filler_trial = {
            type: jsPsychSurveyMultiChoice,
            preamble:  generate_html_string_for_filler_task(memory_test_stimulus),
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
          

  
    console.log("ahhh",block)
    return (block)


}


// loop through all combo and create blocks 

function generate_html_string_for_stimulus(stimulus_string){


    var top_position = getRandomInt(35, 65)
    var left_postion = getRandomInt(40, 60)
    
    s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
        transform: translate(-50%, -50%);left:' + left_postion + '%"></img>'


    return(s)
 }
 
 

function generate_html_string_for_filler_task(stimulus_string){
   

    var top_position = 20
    var left_postion = 46
    
    
    s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;left:' + left_postion + '%"></img>'
        




    return(s)
 }
 




