// initializing the main task package 
main_task = []
test_blocks = []
similarity_stims = []
complexity_stims = []

var similarity_instructions = {
        type: "instructions",
        pages: [
             "<p> In this section, you will be asked to judge the similarity between two creatures you saw.</p>" +
             "<p>There is no right or wrong answer, so feel free to judge the similarity based on your intuition.</p>"
         ],
         data: {stimulus_type: 'instructions'},
         show_clickable_nav: true
}

var complexity_instruction = {
        type: "instructions",
        pages: [
            "<p>Now it's time for the last section!</p><p> In this part, " +
            "you will be asked to rate the complexity of the creatures you just saw. </p>" +
            "<p> Again, there is no right or wrong answer, so feel free to judge their complexity based on your intuition.</p>"
        ],
        data: {stimulus_type: 'instructions'},
        show_clickable_nav: true
}

var scale_similarity = [
  "Most Dissimilar",
  "Very Dissimilar",
  "Quite Dissimilar",
  "Neither Similar Nor Dissimilar",
  "Quite Similar",
  'Very Similar',
  'Most Similar',
];


var scale_complexity = [
  "Simplest",
  "Very Simple",
  "Quite Simple",
  "Neither Simple Nor Complex",
  "Quite Complex",
  'Very Complex',
  'Most Complex',
];





function get_main_task(all_blocks_information){

all_block_timeline_variables = all_blocks_information.map(x => generate_timeline_variables(x))
all_block_forced_trial = get_forced_trial(all_block_timeline_variables, all_blocks_information)

main_task = []
test_blocks = []

// setting up the main task package 
for (var block_index = 0; 
     block_index < all_blocks_information.length; 
     block_index ++){

    block_information = all_blocks_information[block_index]
    block_type = block_information.block_type
    block_task_information = block_information.task_information
    block_forced_exposure_length = block_information.forced_exposure_length


    block_timeline_variable = all_block_timeline_variables[block_index]

    self_paced_trials_variable = all_block_timeline_variables[block_index].slice(1, all_block_timeline_variables[block_index].length)
    


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
                                var html = "<p><img src="+jsPsych.timelineVariable('stimuli', true)+" width ='" + width_height + "' height = '" + width_height + "' style='position:relative;top:" + getRandomInt(-100, 100)+ "%;left:" + getRandomInt(-100, 100) +  "%'></p>"
                                return html
                            },
                       
                            block_deviant: block_information.deviant_stimuli,
                            block_background: block_information.background_stimuli,
                            key_response: [40],
                  
                            minimum_viewing_duration: 500, // in non-first trial and self-paced first trial, 
                            forced_viewing_duration:  block_forced_exposure_length, //50 ~ 1000 with 10 interval random
                            response_ends_trial: true,
                            exposure_type: "self-paced", 
                            data: {block_number: block_index, block_type: block_type,  
                                  block_exposure_length: block_forced_exposure_length,
                                  stimulus_type: 'trial', stimulus_displayed: jsPsych.timelineVariable('stimuli'), trial_type: jsPsych.timelineVariable('stim_type')},
                        }
                        ],
                        timeline_variables: self_paced_trials_variable // need to track of which trial of the block
                  }
        

    var self_paced_prompt =  {
                    type: 'html-keyboard-response',
                    stimulus: 'Now you can keep studying the creature.',
                    trial_duration: 1000,
                    choices: jsPsych.NO_KEYS
                  }
    
    var forced_trial_prompt = {
      type: 'html-keyboard-response',
                    stimulus: 'Watch carefully!',
                    trial_duration: 1000,
                    choices: jsPsych.NO_KEYS
        }

    


        test_blocks.push(forced_trial_prompt)
        test_blocks.push(all_block_forced_trial[block_index])
        test_blocks.push(self_paced_prompt)
        test_blocks.push(test_block)

        task_block = generate_task_block(block_task_information, block_index)
       
  
        test_blocks.push(task_block)     
     
console.log(test_block)

}


console.log(test_blocks)

// putting everything together 
main_task = main_task.concat(test_blocks)
//main_task.push(similarity_instructions)
//main_task = main_task.concat(similarity_stims)
//main_task.push(complexity_instruction)
//main_task = main_task.concat(complexity_stims)

return (main_task)
}
