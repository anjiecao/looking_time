function get_all_stimuli(NUM_COMPLEX_CREATURES, NUM_SIMPLE_CREATURES){


    all_stimuli = []
    MAIN_DIR = "images/stimuli/"
    
    COMPLEX_DIR = MAIN_DIR + "complex_"
    SIMPLE_DIR = MAIN_DIR + "simple_"

    VERSION = ['A']
    ACTION = ['a']

    for (var i = 0; i < NUM_COMPLEX_CREATURES; i++){
      for (var k = 0; k < VERSION.length; k++){
        for (var l = 0; l < ACTION.length; l++){
          if (i < 9){
            index = "0" + (i+1)
          }else{
            index = i+1
          }

          current_complex_creature = COMPLEX_DIR + index +  '_'
                                          + VERSION[k] + '_'
                                          + ACTION[l]
                                          + ".gif"

        }
      }
      all_stimuli.push(current_complex_creature) 
    }

    for (var i = 0; i < NUM_SIMPLE_CREATURES; i++){
      for (var k = 0; k < VERSION.length; k++){
        for (var l = 0; l < ACTION.length; l++){

          if (i < 9){
            index = "0" + (i+1)
          }else{
            index = i+1
          }

          current_simple_creature = SIMPLE_DIR + index +  '_'
                                          + VERSION[k] + '_'
                                          + ACTION[l]
                                          + ".gif"

        }
      }
      all_stimuli.push(current_simple_creature) 
    }
   
   
    return (all_stimuli)

}

all_stimuli = get_all_stimuli(24, 20)


function get_all_prolific_id(subject_stimuli_json){
    return (subject_stimuli_json.map(x => x.prolific_id))
}

all_prolific_id = get_all_prolific_id(subject_stimuli_json)


function get_novel_stimuli(subject_info, all_stimuli){
    subject_seen_stimuli = subject_info.background_stimuli.concat(subject_info.deviant_stimuli.concat(subject_info.question_stimuli))
    all_novel_stimuli = all_stimuli.filter(item => !subject_seen_stimuli.includes(item))

    all_novel_simple = all_novel_stimuli.filter(item => item.includes("simple"))
    all_novel_complex = all_novel_stimuli.filter(item => item.includes("complex"))

    novel_simple = getRandomSubarray(all_novel_simple, 3)
    novel_complex = getRandomSubarray(all_novel_complex, 3)

    novel_stim = novel_complex.concat(novel_simple)

    return(novel_stim)
}


function get_presenting_stmuli(subject_stimuli_json, all_stimuli){

    return(subject_stimuli_json.map(x => 
        {return {"prolific_id" : x.prolific_id, 
                                   "background_stimuli" : x.background_stimuli, 
                                    "deviant_stimuli" : x.deviant_stimuli, 
                                   "novel_stimuli": get_novel_stimuli(x, all_stimuli)}
    }))

}

all_presenting_stimuli = get_presenting_stmuli(subject_stimuli_json, all_stimuli)
console.log("all_presenting_stimuli")
console.log(all_presenting_stimuli)


function get_timeline_variables_from_presenting_stimuli(presenting_stimuli){
    timeline_variables_array = presenting_stimuli.map(x => x.background_stimuli.concat(x.deviant_stimuli.concat(x.novel_stimuli)))
    timeline_variables = timeline_variables_array.map(x => x.map(y => {return {"stimulus": y}}))

    return(timeline_variables) 
}

console.log("all_timeline_variables")
all_timeline_variables = get_timeline_variables_from_presenting_stimuli(all_presenting_stimuli)
console.log(all_timeline_variables)


function variable_to_timeline(timeline_variable){

    var testing_procedure_from_variable = {
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
                    var html = "<p><img src="+jsPsych.timelineVariable('stimulus', true)+" width ='" + width_height + "' height = '" + width_height + "' style='position:relative;top:" + getRandomInt(-100, 100)+ "%;left:" + getRandomInt(-100, 100) +  "%'></p>"
                    return html
                },
        
                key_response: [40],
                
                minimum_viewing_duration: 500, // in non-first trial and self-paced first trial,
                response_ends_trial: true,
                exposure_type: "self_paced", 
                data: {stimulus_type: 'trial', stimulus_displayed: jsPsych.timelineVariable('stimulus')},
            }
            ],
            timeline_variables: timeline_variable,  
            randomize_order: true 
      }

      // buffer 


        var familiarity_instruction = {
                type: "instructions",
                pages: [
                    "<p>Thank you so much! You are almost done!</p><p> In this part, " +
                    "you will be asked to rate the familiarity of the creatures you just saw. </p>" 
                ],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true
        }       

      // rating task 

      var familiarity_rating_procedure = {
          timeline: [
                {type: 'survey-likert',
                 preamble:  function(){
                    var html = '<p><img src= ' + jsPsych.timelineVariable('stimulus', true) + ' width ="200" height = "200"</p>'
                    return html
                    },
                 questions: [
                    {prompt: '<p> How familiar is this creature?</p>', labels:  [
                            "I have never seen this creature before today",
                            "",
                            "",
                            "I'm not sure",
                            "",
                            "",
                            'I have definitely seen this creature in the previous experiment',
                            ], required: true}
                            ],
                    scale_width: '250px',
                    data: {trial_type: 'familiarity_question', stimulus: jsPsych.timelineVariable('stimulus')}
                }
                    ], 
          timeline_variables: timeline_variable, 
          randomize_order: true

    }


    var final_instruction = {
        type: "instructions",
        pages: [
            "<p>Thank you so much for participating in our study again! " +
            "You are all done! </p>" 
        ],
        data: {stimulus_type: 'instructions'},
        show_clickable_nav: true
}       

    full_testing_procedure = [testing_procedure_from_variable, familiarity_instruction, familiarity_rating_procedure, final_instruction]

      return (full_testing_procedure)

}


function generate_timelines(all_timeline_variables){

 return all_timeline_variables.map(x => variable_to_timeline(x))

}

all_timelines = generate_timelines(all_timeline_variables)
console.log("all_timelines")
console.log(all_timelines)




function generate_node(prolific_id, timeline){
    var node = {
        timeline: timeline, 
        conditional_function: function(){
            var data = jsPsych.data.get().last(1).values([0])
            if(data[0].responses.includes(prolific_id)){
                return true
            }else{
                return false 
            }
        }
    }
    return node
} 


var failsafe_instruction = {
    type: "instructions",
    pages: [
        "<p>Unfortunately we are unable to find your prolific ID in our database, please refresh the webpage and try again! </p>" 
    ],
    data: {stimulus_type: 'instructions'},
    show_clickable_nav: true
}       




var failsafe_node = {
    timeline: [failsafe_instruction], 
    conditional_function: function(){
        var data = jsPsych.data.get().last(1).values([0])
        if (!all_prolific_id.includes(data)){
            return true 
        }else{
            return false
        }
    }
}


function generate_timeline_nodes(presenting_stimuli, timelines){
    all_timeline_nodes = []
    for (i = 0; i < presenting_stimuli.length; i++){
        prolific_id = presenting_stimuli[i].prolific_id
        node = generate_node(prolific_id, timelines[0])
        all_timeline_nodes.push(node)
    }

    all_timeline_nodes.push(failsafe_node)

    return (all_timeline_nodes)
}

all_timeline_nodes = generate_timeline_nodes(all_presenting_stimuli, all_timelines)
console.log("all_timeline_nodes")
console.log(all_timeline_nodes)
