// scroll to the bottom to see all the set-up

var verbose = true
var timenum = Date.now();
var turkInfo = jsPsych.turk.turkInfo();
var Prolific = true
var prolific_code = "??????"


var subject_id = 'SS' + timenum;
var survey_code = 'SS' + timenum


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



function get_all_prolific_id(subject_stimuli_json){
  return (subject_stimuli_json.map(x => x.prolific_id))
}



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




function get_timeline_variables_from_presenting_stimuli(presenting_stimuli){
  timeline_variables_array = presenting_stimuli.map(x => x.background_stimuli.concat(x.deviant_stimuli.concat(x.novel_stimuli)))
  timeline_variables = timeline_variables_array.map(x => x.map(y => {return {"stimulus": y}}))

  return(timeline_variables) 
}



function variable_to_timeline(timeline_variable){

  var consent = {
    type: 'instructions',
    pages: ["<div class='w3-container' style='width: 600px; bottom-padding: 20px; text-align: left;'>" +
            "<div style='width: 600px; margin: 0 auto; text-align: center; background-color: #8C1516; padding: 20px 15px 10px 10px'>" +
            "<img src='images/stanford.png' height='46' width='360' alt='Stanford University'></div>"+
            "<center><p><strong>Stanford Language and Cognition Lab</strong></p></center>"+
            "<p>In this experiment, you'll be watching a series of animations at your own pace. You will be asked to judge the similarity and complexity of these animations afterwards." +
            "<p class='block-text' id='legal'>Legal information: By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology. If you have questions about this research, please contact Anjie Cao at <a href='mailto://anjiecao@stanford.edu'>anjiecao@stanford.edu</a>. You must be at least 18 years old to participate. Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you.</p></div><p />" //,
    ],
    show_clickable_nav: true,
    show_page_number: true,
    post_trial_gap: 2000
}


var generic1 = {
  type: "instructions",
  pages: [
    "<p>Welcome back! Thank you very much for participating in our study again!</p><br></br>" +
    "<p>We are researchers who usually study babies. :) </p>" +
    "<p>In particular, we are interested in knowing what makes things interesting or boring to babies. </p>" +
    "<p> In this study, we are going to show you some stimuli, some old and some new! </p>",
    "<p>Similar to the study you participated, this one is going to be really easy too!</p>" +
    "<p>You will repeatedly see a frame on the screen, like this one:</p>" +
    '<p><img src=images/blank.png width ="400" height = "400" style="border:5px solid black"></p>'
    ],
      data: {stimulus_type: 'instructions'},
      show_clickable_nav: true
    }



      var generic2 = {
        type: 'stimuli-presentation',
        frame_animation: function(){


      var html =
                "<p> On each trial, a creature will appear in the frame. </p>" +
                "<p> To continue, <b> press the down arrow-key </b> on your keyboard. </p>" +
                "<p> You can try it now! </p>"

       return html
     },
      //position:absolute;top:28px;left:40px
        stimuli_animation: function(){
            var html = "<img src='images/practice/instructions_example_spore1.gif' width ='400' height = '400' style='border:5px solid black'>"
            return html
        },
        two_stimuli_interval: 0,
        key_response: [40],
        minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
        response_ends_trial: true,
        exposure_type: "self_paced"
      }

      var generic3 = {
        type: 'stimuli-presentation',
        frame_animation: function(){


      var html =
      "<p> You are doing great! </p>" +
      "<p>Now, let's try again.</p>" +
          "<p> Press the down arrow key when you've had enough of this little guy. </p>"

       return html
     },
      //position:absolute;top:28px;left:40px
        stimuli_animation: function(){
            var html = "<img src='images/practice/instructions_example_spore2.gif' width ='400' height = '400' style='border:5px solid black'>"
            return html
        },
        two_stimuli_interval: 0,
        key_response: [40],
        minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
        response_ends_trial: true,
        exposure_type: "self_paced"
      }



      
      var generic4 = {
          type: "instructions",
          pages: [
              "<p> Pretty simple, huh? </p>" +
              "<p> You can study each creature for as long as you like. </p>"],
              data: {stimulus_type: 'instructions'},
              show_clickable_nav: true}


     

      var generic5 = {
          type: "instructions",
      pages: [          "<p> Before we get started, please know that if you experienced significant lag in the preceding animations, it will probably get better once we start the actual experiment. </p>" +
      "<p> If the lagginess persists however, we would really appreciate if you could let us know in the feedback section at the end of the experiment. </p>",
     
      "<p> The task should take no longer than 6 minutes, </p>" +
      "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
      "<p> and then you'll be all done! </p>",
      "<p> Many thanks again for your participation. :) </p> ",
      "<p> <b> The experiment begins now! </b> </p> <br></br>",
          ],
              data: {stimulus_type: 'instructions'},
              show_clickable_nav: true}




   var  instruction_package = [consent, generic1, generic2, generic3, generic4, generic5]



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

  var feedback = {
    type: 'survey-text',
    questions: [
      {prompt: "One last thing! Did you encounter any issue with the experiment? Was the animation laggy? Any other comments you would like to share with us?", placeholder: "", required: true},
    ],
    data: {stimulus_type: 'feedback'},
  };
   
  var thank_you = {
      type: "instructions",
      pages: [
          "<p>Thank you so much for participating in our study! Pleas go to next page for your payment information. </p>"
      ],
      data: {stimulus_type: 'instructions'},
      show_clickable_nav: true
  }
  
  var survey_code_page = {
        type: "instructions",
        pages:[
            "Your survey code is<p><b>"+ prolific_code + "</b></p><p>Please make sure you save this somewhere safe. You will need to enter this code into Prolific to be paid.</p>"
        ],
        show_clickable_nav: false
   }

  full_testing_procedure = instruction_package.concat([testing_procedure_from_variable, familiarity_instruction, familiarity_rating_procedure, 
    feedback, thank_you, survey_code_page])

    return (full_testing_procedure)

}


function generate_timelines(all_timeline_variables){

return all_timeline_variables.map(x => variable_to_timeline(x))

}





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




var failsafe_node = {
  timeline: [
    {type: "instructions",
    pages: [
        "<p>Unfortunately we are unable to find your prolific ID in our database, please refresh the webpage and try again! </p>" 
    ],
    data: {stimulus_type: 'instructions'},
    show_clickable_nav: true
  }       ], 
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





// generate all the settings

all_stimuli = get_all_stimuli(24, 20)
all_prolific_id = get_all_prolific_id(subject_stimuli_json)
all_presenting_stimuli = get_presenting_stmuli(subject_stimuli_json, all_stimuli)
console.log("all_presenting_stimuli")
console.log(all_presenting_stimuli)


console.log("all_timeline_variables")
all_timeline_variables = get_timeline_variables_from_presenting_stimuli(all_presenting_stimuli)
console.log(all_timeline_variables)


all_timelines = generate_timelines(all_timeline_variables)
console.log("all_timelines")
console.log(all_timelines)

all_timeline_nodes = generate_timeline_nodes(all_presenting_stimuli, all_timelines)
console.log("all_timeline_nodes")
console.log(all_timeline_nodes)


all_timeline_nodes = generate_timeline_nodes(all_presenting_stimuli, all_timelines)
console.log("all_timeline_nodes")
console.log(all_timeline_nodes)
