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


console.log(all_blocks_information)
main_task = []
test_blocks = []

// setting up the main task package 
for (var block_index = 0; 
     block_index < all_blocks_information.length; 
     block_index ++){

    block_information = all_blocks_information[block_index]

  
    block_type = block_information.block_type
    block_timeline_variable = generate_timeline_variables(block_information)
    block_task_information = block_information.task_information

    


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
                                
                                var width_height = parseFloat(Math.floor(Math.random() * 10) + 225);
                                var html = "<p><img src="+jsPsych.timelineVariable('stimuli', true)+" width ='" + width_height + "' height = '" + width_height + "' style='position:relative;top:" + getRandomInt(-100, 100)+ "%;left:" + getRandomInt(-100, 100) +  "%'></p>"
                                return html
                            },
                       
                            block_deviant: block_information.deviant_stimuli,
                            block_background: block_information.background_stimuli,
                            key_response: [40],
                            first_trial: function(){
                                return jsPsych.timelineVariable('first_trial', true)
                            }, 
                            minimum_viewing_duration: 500, // in non-first trial and self-paced first trial, 
                            forced_short_viewing_duration: 10 * (getRandomInt(forced_short_viewing_duration_base, 100)), //50 ~ 1000 with 10 interval random
                            forced_long_viewing_duration: forced_long_viewing_duration,
                            response_ends_trial: true,
                            exposure_type: "self_paced", 
                            data: {block_number: block_index, block_type: block_type,  stimulus_type: 'trial', stimulus_displayed: jsPsych.timelineVariable('stimuli'), trial_type: jsPsych.timelineVariable('stim_type')},
                        }
                        ],
                        timeline_variables: block_timeline_variable // need to track of which trial of the block
                  }
    
        test_blocks.push(test_block)

        task_block = generate_task_block(block_task_information, block_index)
       
  
        test_blocks.push(task_block)     
     


     // collecting norming stimuli here

     // similarity quesitons only asked regarding the blocks w/ deviant 
    if (all_blocks_information[block_index]['deviant_stimuli'] != null){

      similarity_array = [all_blocks_information[block_index]['background_stimuli'], all_blocks_information[block_index]['deviant_stimuli']]

      // shuffle to randomize deviant/background left/right assignment
      shuffleArray(similarity_array)
 
     var similarity_questions = {
         type: 'survey-likert',
         preamble: '<p><img src=' + similarity_array[0] + ' width ="150" height = "150";"></p>' +
        '<p><img src=' + similarity_array[1] + ' width ="150" height = "150";" ></p> ',
         questions: [
           {prompt: '<p> How similar are these creatures?</p>', labels: scale_similarity, required: true}
         ],
         scale_width: '250px',
         data: {stimulus_type: 'similarity_question', stimulus_left: similarity_array[0], stimulus_right: similarity_array[1]}
       }
 
 
      similarity_stims.push(similarity_questions)


    }else{
      similarity_array = [all_blocks_information[block_index]['background_stimuli']]
    }


 

     // random index for complexity question
     random_index = Math.floor(Math.random() * similarity_array.length)

    // ask about the complexity of either deviant or background (randomly chosen)
    var complexity_questions = {
      type: 'survey-likert',
      preamble: '<p><img src= ' + similarity_array[random_index] + ' width ="200" height = "200"</p>',
      questions: [
        {prompt: '<p> How complex is this creature?</p>', labels: scale_complexity, required: true}
      ],
      scale_width: '250px',
      data: {trial_type: 'complexity_question', stimulus: similarity_array[random_index]}
    };

     complexity_stims.push(complexity_questions)

}

shuffleArray(similarity_stims)
shuffleArray(complexity_stims)

// putting everything together 
main_task = main_task.concat(test_blocks)
main_task.push(similarity_instructions)
main_task = main_task.concat(similarity_stims)
main_task.push(complexity_instruction)
main_task = main_task.concat(complexity_stims)

return (main_task)
}
