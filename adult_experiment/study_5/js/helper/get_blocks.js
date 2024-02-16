
function reorder_all_blocks(all_blocks_info){

    shuffleArray(all_blocks_info)

    exposure_duration_a  = [1, 2]
    exposure_duration_b  = [3, 4]
    exposure_duration_c = [5, 6]
    exposure_duration_d = [7, 8]
    exposure_duration_e = [9, 10]

    exposure_duration_a_blocks = all_blocks_info.filter(item => (item.exposure_duration == 1 || item.exposure_duration == 2) && item.block_type == "deviant_block")
    exposure_duration_b_blocks = all_blocks_info.filter(item => (item.exposure_duration == 3 || item.exposure_duration == 4) && item.block_type == "deviant_block")
    exposure_duration_c_blocks = all_blocks_info.filter(item => (item.exposure_duration == 5 || item.exposure_duration == 6) && item.block_type == "deviant_block")
    exposure_duration_d_blocks = all_blocks_info.filter(item => (item.exposure_duration == 7 || item.exposure_duration == 8) && item.block_type == "deviant_block")
    exposure_duration_e_blocks = all_blocks_info.filter(item => (item.exposure_duration == 9 || item.exposure_duration == 10) && item.block_type == "deviant_block")
    
    all_background_blocks = all_blocks_info.filter(item => item.block_type == "background_block")

    // 4 groups in total, each group has 2 background, 1 identity, 1 animacy, 1 number, 1 pose
    
    all_block_groups = []
    for (var i in [0, 1]){
        current_block_group = []

        current_block_group.push(exposure_duration_a_blocks.pop())
        current_block_group.push(exposure_duration_b_blocks.pop())
        current_block_group.push(exposure_duration_c_blocks.pop())
        current_block_group.push(exposure_duration_d_blocks.pop())
        current_block_group.push(exposure_duration_e_blocks.pop())
        current_block_group.push(all_background_blocks.pop())
        shuffleArray(current_block_group)
        all_block_groups.push(current_block_group)
    }

    // two more extra background blocks 
    all_block_groups.push([all_background_blocks.pop()])
    all_block_groups.push([all_background_blocks.pop()])
    all_block_groups.push([all_background_blocks.pop()])

    // randomly locating 
    shuffleArray(all_block_groups)
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

        if (block_info.block_type == "deviant_block"){
            trial = {
                type: curtainDisplay, 
                stimulus: generate_html_string_for_stimulus(block_info.deviant_stimulus), 
                valid_key_press: [" "],
                data: block_info
            }
            block.push(trial)
        }
        

        // add filler task 
        var filler_trial = {
            type: jsPsychSurveyMultiChoice,
            preamble:  generate_html_string_for_filler_task( block_info.memory_test_stimulus),
            questions: [
              {prompt:
                      'Did this animal appear in the preceding trials?', 
               options: ["Yes", "No"], 
               required: true, 
               horizontal: true},
            ],
            data: {stimulus_type: 'memory_test',
            memory_test_type: block_info.memory_test_type, 
            memory_test_stimulus: block_info.memory_test_stimulus},
          }

          block.push(filler_trial)
          

  
    return (block)


}


// loop through all combo and create blocks 

function generate_html_string_for_stimulus(stimulus_string){


    var top_position = getRandomInt(35, 65)
    var left_postion = getRandomInt(40, 60)
    
    s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:200px; height:200px;position:fixed; top:' + top_position + '%;\
        transform: translate(-50%, -50%);left:' + left_postion + '%"></img>'


    return(s)
 }
 
 

function generate_html_string_for_filler_task(stimulus_string){
   

    var top_position = 20
    var left_postion = 46
    
    
    s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;left:' + left_postion + '%"></img>'
        




    return(s)
 }
 




