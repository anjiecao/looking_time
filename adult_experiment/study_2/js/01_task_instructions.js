function get_consent_and_instructions(timeline, task_type){

  /*
if (task_type == "memory"){
  instruction_package = get_memory_instruction()
}else if(task_type == "curiosity"){
  instruction_package = get_curiosity_instruction()
}else if(task_type == "math"){
  instruction_package = get_math_instruction()
}
*/

instruction_package = get_generic_instruction()

timeline = timeline.concat(instruction_package)


      
return timeline
}

function get_consent_and_instructions_for_demo(task_type){

    /*
  if (task_type == "memory"){
    instruction_package = get_memory_instruction()
  }else if(task_type == "curiosity"){
    instruction_package = get_curiosity_instruction()
  }else if(task_type == "math"){
    instruction_package = get_math_instruction()
  }
  
  */

  instruction_package = get_generic_instruction()
    
  return (instruction_package)
  }
  

  function get_generic_instruction(){

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
      "<p>Hello! Thank you very much for participating in our study!</p><br></br>" +
      "<p>We are researchers who usually study babies. :) </p>" +
      "<p>In particular, we are interested in knowing what makes things interesting or boring to babies. </p>" +
      "<p> So we designed some cute stimuli, which we are hoping to show to babies soon! </p>" +
      "<p> But first, to get an initial idea, we are trying our experiment with adults first (i.e. you!). </p>" +
      "<p> So we really appreciate your help! </p>"
      ,
      "<p>Since this task was designed for babies, it's going to be really easy!</p>" +
      "<p>You will repeatedly see a frame on the screen, like this one:</p>" +
      '<p><img src=images/blank.png width ="400" height = "400" style="border:5px solid black"></p>', 

      "<p>On each trial, you will first see a creature shows up and then disappears. </p>" +
      "<p>Then, you will have the opportunity to look at some creatures. You can look at each for as long as you want.</p>" +
      "<p>Every couple of trials, we will test your memory of the creatures. </p>"  + 
      "<p><b>So please study the creatures carefully</b></p>" + 
      "<p>You can go to the next page to see an example trial</p>"
      ],
        data: {stimulus_type: 'instructions'},
        show_clickable_nav: true
      }
  
  
      
  

      var example_self_paced_prompt =  {
        type: 'html-keyboard-response',
        stimulus: 'Now you can keep studying the creature.',
        trial_duration: 1000 ,
        choices: jsPsych.NO_KEYS
      }

      var example_forced_trial_prompt = {
      type: 'html-keyboard-response',
        stimulus: 'Watch carefully!',
        trial_duration: 1000,
        choices: jsPsych.NO_KEYS
      }

      forced_trial_duration = 10 * (getRandomInt(forced_short_viewing_duration_base, 100))
      width_height = parseFloat(Math.floor(Math.random() * 10) + 150);

      var example_forced_trial = {
        type: 'stimuli-presentation',
        frame_animation: function(){
            var html =  '<p><img src= images/blank.png width ="600" height = "600" style="position:fixed; top:50%; transform: translate(-50%, -50%);left:50%;border:5px solid black">'
          
            return html;
        },
        
        stimuli_animation:  "<p><img src='images/practice/instructions_example_spore1.gif' width ='" + width_height + "' height = '" + width_height + "' style='position:relative;top:" + getRandomInt(-100, 100)+ "%;left:" + getRandomInt(-100, 100) +  "%'></p>",
        key_response: [40],
        minimum_viewing_duration: 500, // in non-first trial and self-paced first trial, 
        forced_viewing_duration: forced_trial_duration, //50 ~ 1000 with 10 interval random
        trial_duration: forced_trial_duration,
        response_ends_trial: true,
        exposure_type: "forced"
      }

  
        var example_self_paced_trial_1 = {
              type: 'stimuli-presentation',
              frame_animation: function(){
                var html = "<p> To continue, <b> press the down arrow-key </b> on your keyboard. </p>"
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

        var example_self_paced_trial_2 = {
                type: 'stimuli-presentation',
                frame_animation: function(){
                    var html =
                        "<p> Sometimes a creature will repeatedly show up, You can just move on to the next one when you feel like you have remembered this creature.</p>" 
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

        var example_self_paced_trial_3 = {
          type: 'stimuli-presentation',
          frame_animation: function(){
  
  
        var html =
                  "<p> Press the <b>down arrow-key </b> on your keyboard to move on.</p>" 
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
      
        "<p> We hope you enjoy our baby stimuli! </p>" +
        "<p> The task should take no longer than 6 minutes, </p>" +
        "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
        "<p> and then you'll be all done! </p>",
        "<p> Many thanks again for your participation. :) </p> ",
        "<p> <b> The experiment begins now! </b> </p> <br></br>",
            ],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}
  
  
        instruction_package = [consent, generic1, 
          example_forced_trial_prompt,
          example_forced_trial, 
          example_self_paced_prompt, 
          example_self_paced_trial_1,
          example_self_paced_trial_2, 
          example_self_paced_trial_3, 
          generic4, 
                            generic5]
  
        return (instruction_package)
  
  }










function get_curiosity_instruction(){

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


var curiosity1 = {
  type: "instructions",
  pages: [
    "<p>Hello! Thank you very much for participating in our study!</p><br></br>" +
    "<p>We are researchers who usually study babies. :) </p>" +
    "<p>In particular, we are interested in knowing what makes things interesting or boring to babies. </p>" +
    "<p> So we designed some cute stimuli, which we are hoping to show to babies soon! </p>" +
    "<p> But first, to get an initial idea, we are trying our experiment with adults first (i.e. you!). </p>" +
    "<p> So we really appreciate your help! </p>"
    ,
    "<p>Since this task was designed for babies, it's going to be really easy!</p>" +
    "<p>You will repeatedly see a frame on the screen, like this one:</p>" +
    '<p><img src=images/blank.png width ="400" height = "400" style="border:5px solid black"></p>'
    ],
      data: {stimulus_type: 'instructions'},
      show_clickable_nav: true
    }



      var curiosity2 = {
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

      var curiosity3 = {
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



      
      var curiosity4 = {
          type: "instructions",
          pages: [
              "<p> Pretty simple, huh? </p>" +
              "<p> You can study each creature for as long as you like. </p>"],
              data: {stimulus_type: 'instructions'},
              show_clickable_nav: true}


     

      var curiosity5 = {
          type: "instructions",
      pages: [          "<p> Before we get started, please know that if you experienced significant lag in the preceding animations, it will probably get better once we start the actual experiment. </p>" +
      "<p> If the lagginess persists however, we would really appreciate if you could let us know in the feedback section at the end of the experiment. </p>",
      "<p> Final point about the experiment:</p> <p>  Every couple of trials, we will ask you a simple question. </p>" +
      "<p> Then you will see a new set of creatures to look at for as long as you like, </p>" +
      "<p> and you can still move between creatures by pressing the down arrow. </p>",
      "<p> We hope you enjoy our baby stimuli! </p>" +
      "<p> The task should take no longer than 6 minutes, </p>" +
      "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
      "<p> and then you'll be all done! </p>",
      "<p> Many thanks again for your participation. :) </p> ",
      "<p> <b> The experiment begins now! </b> </p> <br></br>",
          ],
              data: {stimulus_type: 'instructions'},
              show_clickable_nav: true}


      instruction_package = [consent, curiosity1, curiosity2, curiosity3, curiosity4, curiosity5]

      return (instruction_package)

}

function get_math_instruction(){
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


var math1 = {
  type: "instructions",
  pages: [
    "<p>Hello! Thank you very much for participating in our study!</p><br></br>" +
    "<p>We are researchers who usually study babies. :) </p>" +
    "<p>In particular, we are interested in knowing what makes things interesting or boring to babies. </p>" +
    "<p> So we designed some cute stimuli, which we are hoping to show to babies soon! </p>" +
    "<p> But first, to get an initial idea, we are trying our experiment with adults first (i.e. you!). </p>" +
    "<p> So we really appreciate your help! </p>"
    ,
    "<p>Since this task was designed for babies, it's going to be really easy!</p>" +
    "<p>You will repeatedly see a frame on the screen, like this one:</p>" +
    '<p><img src=images/blank.png width ="400" height = "400" style="border:5px solid black"></p>'
    ],
      data: {stimulus_type: 'instructions'},
      show_clickable_nav: true
    }



      var math2 = {
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

      var math3 = {
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



      
      var math4 = {
          type: "instructions",
          pages: [
              "<p> Pretty simple, huh? </p>" +
              "<p> You can study each creature for as long as you like. </p>"],
              data: {stimulus_type: 'instructions'},
              show_clickable_nav: true}


     

      var math5 = {
          type: "instructions",
      pages: [          "<p> Before we get started, please know that if you experienced significant lag in the preceding animations, it will probably get better once we start the actual experiment. </p>" +
      "<p> If the lagginess persists however, we would really appreciate if you could let us know in the feedback section at the end of the experiment. </p>",
      "<p> Final point about the experiment:</p> <p>  Every couple of trials, we will ask you a simple question. </p>" +
      "<p> Then you will see a new set of creatures to look at for as long as you like, </p>" +
      "<p> and you can still move between creatures by pressing the down arrow. </p>",
      "<p> We hope you enjoy our baby stimuli! </p>" +
      "<p> The task should take no longer than 6 minutes, </p>" +
      "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
      "<p> and then you'll be all done! </p>",
      "<p> Many thanks again for your participation. :) </p> ",
      "<p> <b> The experiment begins now! </b> </p> <br></br>",
          ],
              data: {stimulus_type: 'instructions'},
              show_clickable_nav: true}


      instruction_package = [consent, math1, math2, math3, math4, math5]

      return (instruction_package)


}


function get_memory_instruction(){

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


var memory1 = {
  type: "instructions",
  pages: [
    "<p>Hello! Thank you very much for participating in our study!</p><br></br>" +
    "<p>We are researchers who usually study babies. :) </p>" +
    "<p>In particular, we are interested in knowing what makes things interesting or boring to babies. </p>" +
    "<p> So we designed some cute stimuli, which we are hoping to show to babies soon! </p>" +
    "<p> But first, to get an initial idea, we are trying our experiment with adults first (i.e. you!). </p>" +
    "<p> So we really appreciate your help! </p>",
    "<p>Since this task was designed for babies, it's going to be really easy!</p>" +
    "<p>You will repeatedly see a frame on the screen, like this one:</p>" +
    '<p><img src=images/blank.png width ="400" height = "400" style="border:5px solid black"></p>'
    ],
      data: {stimulus_type: 'instructions'},
      show_clickable_nav: true
    }



      var memory2 = {
        type: 'stimuli-presentation',
        frame_animation: function(){


      var html =
                "<p> On each trial, a creature will appear in the frame. </p>" +
                "<p> Please pay careful attention to the details of the creature.</p>" +  
                "<p> When you have finished examined the creature, <b> press the down arrow-key </b> on your keyboard. </p>" +
                "<p> You can try it now! </p>"

       console.log(html)
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



      var memory3 = {
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

      
      var memory4 = {
          type: "instructions",
          pages: [
              "<p> Pretty simple, huh? </p>" +
              "<p> You can study each creature for as long as you like. </p>" +  
              "<p> Please try your best to remember the details of the creatures.</p>" +  
              "<p> Throughout the experiment, you will be asked about the creatures. On the next page, you will see an example. </p>"],
              data: {stimulus_type: 'instructions'},
              show_clickable_nav: true}


     
      var memory5 = {
                type: "instructions",
            pages: [          "<p> Before we get started, please know that if you experienced significant lag in the preceding animations, it will probably get better once we start the actual experiment. </p>" +
            "<p> If the lagginess persists however, we would really appreciate if you could let us know in the feedback section at the end of the experiment. </p>",
            "<p> Final point about the experiment:</p> <p>  Every couple of trials, we will ask you a simple question. </p>" +
            "<p> Then you will see a new set of creatures to look at for as long as you like, </p>" +
            "<p> and you can still move between creatures by pressing the down arrow. </p>",
            "<p> We hope you enjoy our baby stimuli! </p>" +
            "<p> The task should take no longer than 6 minutes, </p>" +
            "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
            "<p> and then you'll be all done! </p>",
            "<p> Many thanks again for your participation. :) </p> ",
            "<p> <b> The experiment begins now! </b> </p> <br></br>",
                ],
                    data: {stimulus_type: 'instructions'},
                    show_clickable_nav: true}
      



      instruction_package = [consent, memory1, memory2, memory3, memory4, memory5, memory6]

      return (instruction_package)
}