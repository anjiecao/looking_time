function get_instruction(){

    var consent = {
        type: jsPsychInstructions,
        pages: ["<div class='w3-container' style='width: 600px; bottom-padding: 20px; text-align: left;'>" +
                "<div style='width: 600px; margin: 0 auto; text-align: center; background-color: #8C1516; padding: 20px 15px 10px 10px'>" +
                "<img src='media/stanford.png' height='46' width='360' alt='Stanford University'></div>"+
                "<center><p><strong>Stanford Language and Cognition Lab</strong></p></center>"+
                "<p>In this experiment, you'll be watching a series of animations at your own pace. You will be asked to judge the similarity and complexity of these animations afterwards." +
                "<p class='block-text' id='legal'>Legal information: By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology. If you have questions about this research, please contact Anjie Cao at <a href='mailto://anjiecao@stanford.edu'>anjiecao@stanford.edu</a>. You must be at least 18 years old to participate. Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you.</p></div><p />" //,
        ],
        show_clickable_nav: true,
        show_page_number: true,
        post_trial_gap: 2000
    }
    
    
    var instruction1 = {
      type: jsPsychInstructions,
      pages: [
        "<p>Hello! Thank you very much for participating in our study!</p><br></br>" +
        "<p>We are researchers who usually study babies. :) </p>" +
        "<p>In particular, we are interested in knowing what makes things interesting or boring to babies. </p>" +
        "<p> So we designed some cute stimuli, which we are hoping to show to babies soon! </p>" +
        "<p> But first, to get an initial idea, <b>we want to know what adults think of our stimuli.</b> </p>" +
        "<p> <b>You will be asked to judge the complexity of the stimuli and the similarity between them.</b> </p>" +
        "<p> We really appreciate your help! </p>"
        ],
          data: {stimulus_type: 'instructions'},
          show_clickable_nav: true
        }
    
    

    var instruction2 = {
        type: jsPsychInstructions,
    
        pages: [          "<p> Before we get started, we want to give you some examples of our complexity judgement trials, so you know what to expect </p>"
    //"<p> <b> The experiment begins now! </b> </p> <br></br>",
        ],
            data: {stimulus_type: 'instructions'},
            show_clickable_nav: true}

    var top_position = 20
    var left_postion = 46

    var complex_anchor_trial = {

        type: jsPsychSurveyLikert,
        preamble:  '<img src="' +  "media/stimuli/obj_circuit.png" + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
        transform: translate(-50%, -50%);left:' + left_postion + '%"></img>',
        scale_width: 1000,
      questions: [
        {
          prompt: "This is a very complex animation. How would you rate the complexity of this animation?", 
          labels:  [
            "Simplest",
            "Very Simple",
            "Quite Simple",
            "Neither Simple Nor Complex",
            "Quite Complex",
            'Very Complex',
            'Most Complex',
          ],
          required: true
        }
      ],
      data: {
          rating_type: "anchoring"
      }


    }

    var simple_anchor_trial = {

        type: jsPsychSurveyLikert,
        preamble:  '<img src="' + "media/stimuli/obj_ball.png" + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
        transform: translate(-50%, -50%);left:' + left_postion + '%"></img>',
        scale_width: 1000,
      questions: [
        {
          prompt: "This is a very simple animation. How would you rate the complexity of this animation?", 
          labels:  [
            "Simplest",
            "Very Simple",
            "Quite Simple",
            "Neither Simple Nor Complex",
            "Quite Complex",
            'Very Complex',
            'Most Complex',
          ],
          required: true
        }
      ],
      data: {
          rating_type: "anchoring"
      }


    }


    var instruction3 = {
        type: jsPsychInstructions,
    
        pages: [          "<p> You did great! The experiment begins now!</p>"
        ],
            data: {stimulus_type: 'instructions'},
            show_clickable_nav: true}




    instruction = [consent, instruction1,instruction2, complex_anchor_trial, simple_anchor_trial, instruction3]

    return (instruction)

}