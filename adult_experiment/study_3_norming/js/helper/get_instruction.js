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
    
        pages: [          "<p> Before we get started, please know that if you experienced significant lag in the preceding animations, it will probably get better once we start the actual experiment. </p>" +
    "<p> If the lagginess persists however, we would really appreciate if you could let us know in the feedback section at the end of the experiment. </p>",
    "<p> <b> The experiment begins now! </b> </p> <br></br>",
        ],
            data: {stimulus_type: 'instructions'},
            show_clickable_nav: true}




    instruction = [consent, instruction1,instruction2]

    return (instruction)

}