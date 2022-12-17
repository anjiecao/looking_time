

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
        background_html = generate_html_string_for_stimulus(block_info.background_type, block_info.background_stimulus)

        // generate all trials
        block = []
        for (var i = 0; i < block_info.trial_number; i++){
            trial = {
                type: curtainDisplay, 
                stimulus: background_html, 
                valid_key_press: [" "],
                data: block_info
              }
              block.push(trial)
        }

  
    }else{
        background_html = generate_html_string_for_stimulus(block_info.background_type, block_info.background_stimulus)
        deviant_html =  generate_html_string_for_stimulus(block_info.deviant_type, block_info.deviant_stimulus)

        // generate all background
        block = []
        for (var i = 0; i < block_info.trial_number-1; i++){
            trial = {
                type: curtainDisplay, 
                stimulus: background_html, 
                valid_key_press: [" "],
                data: block_info
              }
              block.push(trial)
        }
        // add deviant at the end
        trial = {
            type: curtainDisplay, 
            stimulus: deviant_html, 
            valid_key_press: [" "],
            data: block_info
        }
        block.push(trial)

  
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
 
 




