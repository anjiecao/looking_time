
function make_main_blocks(version){

    if (version == "simple"){
        all_blocks_information = all_simple_blocks_information
    }else{
        all_blocks_information = all_complex_blocks_information
    }





// initializing the main task package 
main_task = []
test_blocks = []
initial_stickers_array = get_initial_sticker_html_array(8)
final_stickers_array = get_final_sticker_html_array(8)
all_sticker_blocks = get_all_stickers_blocks_array(initial_stickers_array, final_stickers_array)




// setting up the main task package 
for (var block_index = 0; 
     block_index < all_blocks_information.length; 
     block_index ++){

    block_information = all_blocks_information[block_index]
    block_type = block_information.block_type
    block_timeline_variable = generate_timeline_variables(block_information)
    exposure_type = block_information.exposure_type
    memory_item = block_information.memory_item
    memory_test_type = block_information.memory_test_type
    
    if (verbose){
        console.log("Each block time variable: ")
        console.log(block_timeline_variable)
        console.log('info: ' + block_information['stims_in_order'])
        console.log("memory question stimuli for the block:")
        console.log(memory_item)
    }


    var test_block = {
                    timeline: [
                        {
                            type: 'html-keyboard-response',
                            stimulus: '<p><img src= images/blank.png width ="600" height = "600" style="position:fixed;top:50%; left:50%; transform: translate(-50%, -50%); border:5px solid black">',
                            trial_duration: function(){
                                var random_duration = 800 + 500 * Math.random() 
                                return random_duration  } ,
                            choices: jsPsych.NO_KEYS
                        },
                        {
                            type: 'stimuli-presentation',
                            frame_animation: function(){
                                var html =  '<p><img src= images/blank.png width ="600" height = "600" style="position:fixed; top:50%; transform: translate(-50%, -50%);left:50%;border:5px solid black">'
                               
                                return html;
                            },
                            
                          stimuli_animation: function(){
                          
                                var width_height = parseFloat(Math.floor(Math.random() * 10) + 150);
                                var html = "<p><img src="+jsPsych.timelineVariable('stimuli', true)+" width ='" + width_height + "' height = '" + width_height + "' style='position:relative;top:" + getRandomInt(-100, 100)+ "%;left:" +  getRandomInt(-100, 100)  +  "%'></p>"
                                return html
                            },
                       
                            block_deviant: block_information.deviant_stimuli,
                            block_background: block_information.background_stimuli,
                            key_response: [32],
                            first_trial: function(){
                                return jsPsych.timelineVariable('first_trial', true)
                            }, 
                            minimum_viewing_duration: 500, // in non-first trial and self-paced first trial, 
                            forced_short_viewing_duration: 10 * (getRandomInt(forced_short_viewing_duration_base, 100)), //50 ~ 1000 with 10 interval random
                            forced_long_viewing_duration: forced_long_viewing_duration,
                            response_ends_trial: true,
                            exposure_type: "self_paced", 
                            data: {version: version, block_number: block_index, block_type: block_type,  stimulus_type: 'trial', stimulus_displayed: jsPsych.timelineVariable('stimuli'), trial_type: jsPsych.timelineVariable('stim_type')},
                        }
                        ],
                        timeline_variables: block_timeline_variable // need to track of which trial of the block
                  }
    
        test_blocks.push(test_block)
  
    // to be changed for new version 
    if (block_index < all_blocks_information.length) {


        if (version != "simple"){


       
        
        var memory_question = {
                type: 'html-button-response', 
                stimulus: '',
                choices: ["option"], 
                margin_horizontal: 20,
                button_html: ['<p><img src= ' +  memory_item + ' width ="400" height = "400"</p>'
                            ],
                            
                data: {stimulus_type: "memory_test",
                    memory_block_index: block_index, 
                    memory_test_type: memory_test_type,
                    memory_options_left: memory_item
                    }
        }
                test_blocks.push(memory_question)

        }



        var great_job = {
            type: 'instructions',
            pages: [
                "<p><img src=images/greatjob.gif width ='500' height = '500'></p>"
            ],
            show_clickable_nav: true
        
        
         }   
        


          
          
              
    }

        //test_blocks.push(great_job)
        test_blocks.push(all_sticker_blocks[block_index])

     
  }
// putting everything together 
main_task = main_task.concat(test_blocks)
return(main_task)

}

main_task_simple = make_main_blocks("simple")
main_task_complex = make_main_blocks("complex")



var set_up_stimuli_version = {
    type: 'html-button-response', 
    stimulus: '<p><img src= ' +  "images/seemore.gif" + ' width ="400" height = "400"</p>',
    choices: ["complex", "simple"], 
    margin_horizontal: 100,
    button_html: ['<p><img src= ' +  "images/smiley.png" + ' width ="150" height = "150"</p>', 
                  '<p><img src= ' +  "images/frowny.png" + ' width ="150" height = "150"</p>'
                ]
}


