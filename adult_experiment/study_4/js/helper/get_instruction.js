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
        "<p> But first, to get an initial idea, we are trying our experiment with adults first (i.e. you!). </p>" +
        "<p> So we really appreciate your help! </p>"
        ,
        "<p>Since this task was designed for babies, it's going to be really easy!</p>" +
        "<p>You will repeatedly see a stage on the screen. </p>" + 
        "<p>At the beginning of each trial, you will see a gray curtain being raised that reveals the animation behind the curtain. </p>"+
        "<p>Whenever you feel like you have seen enough of the animation, you can press the space bar to proceed to the next trial.</p>" + 
        "<p>You will see a few example trials next." 
        ],
          data: {stimulus_type: 'instructions'},
          show_clickable_nav: true
        }
    
    var demo_1 = {    
        type: curtainDisplay, 
        demo_mode: true, 
        demo_string: "Press the space whenever you have seen enough of this animation.",
        stimulus: '<img src="' + "media/practice/p1.jpeg" + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + 50 + '%;\
        transform: translate(-50%, -50%);left:' + 50 + '%"></img>', 
        valid_key_press: [" "], 
        data: {stimulus_type:'instructions'}
    }

    var demo_2 = {    
        type: curtainDisplay, 
        demo_mode: true, 
        demo_string: "You did great! Let's try again! Press the spacebar whenever you want to go to the next trial",
        stimulus: '<img src="' + "media/practice/p1.jpeg" + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + 44 + '%;\
        transform: translate(-50%, -50%);left:' + 34 + '%"></img>', 
        valid_key_press: [" "], 
        data: {stimulus_type:'instructions'}
    }

    var demo_3 = {    
        type: curtainDisplay, 
        demo_mode: true, 
        demo_string: "Awesome! You are almost ready for the experiment!",
        stimulus: '<img src="' + "media/practice/p2.png" + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + 54 + '%;\
        transform: translate(-50%, -50%);left:' + 54 + '%"></img>', 
        valid_key_press: [" "], 
        data: {stimulus_type:'instructions'}
    }

    var instruction2 = {
        type: jsPsychInstructions,
    
        pages: [          "<p> Before we get started, please know that if you experienced significant lag in the preceding animations, it will probably get better once we start the actual experiment. </p>" +
    "<p> If the lagginess persists however, we would really appreciate if you could let us know in the feedback section at the end of the experiment. </p>",
    "<p> Final point about the experiment:</p> <p>  Every couple of trials, we will ask you a simple question. </p>" +
    "<p> Then you will see a new set of creatures to look at for as long as you like, </p>" +
    "<p> and you can still move between creatures by pressing the space bar. </p>",
    "<p> We hope you enjoy our baby stimuli! </p>" +
    "<p> The task should take no longer than 6 minutes, </p>" +
    "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
    "<p> and then you'll be all done! </p>",
    "<p> Many thanks again for your participation. :) </p> ",
    "<p> <b> The experiment begins now! </b> </p> <br></br>",
        ],
            data: {stimulus_type: 'instructions'},
            show_clickable_nav: true}




    //instruction = [consent, instruction1, demo_1, demo_2, demo_3, instruction2]
    instruction = [consent]
    return (instruction)

}