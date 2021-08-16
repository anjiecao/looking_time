
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
    memory_question_stimuli = block_information.memory_test_stimuli
    shuffleArray(memory_question_stimuli)
    
    memory_question_right_answer = block_information.memory_question_right_answer
    
    if (verbose){
        console.log("Each block time variable: ")
        console.log(block_timeline_variable)
        console.log('info: ' + block_information['stims_in_order'])
        console.log("memory question stimuli for the block:")
        console.log(memory_question_stimuli)
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
                choices: ["right", "wrong"], 
                button_html: ['<p><img src= ' +   memory_question_stimuli[0] + ' width ="400" height = "400"</p>', 
                            '<p><img src= ' +   memory_question_stimuli[1] + ' width ="400" height = "400"</p>'
                            ],
                            
                data: {stimulus_type: "memory_test",
                    memory_block_index: block_index, 
                    memory_block_answer: memory_question_right_answer,
                    memory_options_left: memory_question_stimuli[0], 
                    memory_options_right: memory_question_stimuli[1] 
                    }
        }
                test_blocks.push(memory_question)

        }



        


            var buffer_page = {
                type: 'stimuli-presentation',
                frame_animation: function(){
                  var html = ""
               return html
             },
                stimuli_animation: function(){
                    var html = 
                 
                   "<img src='images/spacebar.jpg'>"
                    return html
                },
                key_response: [32],
                minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
                response_ends_trial: true,
                  exposure_type: "self_paced",
                 data: {stimulus_type: 'buffer_page'}
              }

            
        var great_job = {

            type: 'stimuli-presentation',
                    frame_animation: function(){
        
        
                    var html =
                    ""
        
                    return html
                    },
                    //position:absolute;top:28px;left:40px
                        stimuli_animation: function(){
                            var html = "<img src='images/greatjob.gif'>"
                        return html 
                        },
                        two_stimuli_interval: 0,
                        key_response: [32],
                        minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
                        response_ends_trial: true,
                        exposure_type: "self_paced"
        
        
            }
          
              
    }

        test_blocks.push(great_job)
        test_blocks.push(all_sticker_blocks[block_index])

        if(block_index < all_blocks_information.length-1){
            test_blocks.push(buffer_page)
        }
        
     
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
    button_html: ['<p><img src= ' +  "images/smiley.png" + ' width ="150" height = "150"</p>', 
                  '<p><img src= ' +  "images/frowny.png" + ' width ="150" height = "150"</p>'
                ]
}



