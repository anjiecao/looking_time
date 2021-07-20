function get_consent_and_instructions(timeline){


var forced_short_viewing_duration = 500
var forced_long_viewing_duration = 15 * 1000

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
    
var intro0 = {
    type: "instructions",
    pages: [
        "<p>Hello! Thank you very much for participating in our <b>memory study</b>!</p><br></br>" +
        "<p>In this study, you will see some cute stimuli. </p>" + 
        "<p>Ever once in a while, your memory of those stimuli will be tested. </p>" +
        "<p>You are going to be asked if you have seen the stimuli before.</p>" +
        "<p> So please pay careful attention to the stimuli. </p>" +
        "<p> But first, let's get familiar with the study. </p>",

        "<p>You will repeatedly see a frame on the screen, like this one:</p>" +
        '<p><img src=images/blank.png width ="400" height = "400" style="border:5px solid black"></p>'
      ],
        data: {stimulus_type: 'instructions'},
        show_clickable_nav: true
      }



        var intro1 = {
          type: 'stimuli-presentation',
          frame_animation: function(){


        var html =
                  "<p> On most trials, a creature will appear in the frame. </p>" +
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


        var intro2 = {
          type: 'stimuli-presentation',
          frame_animation: function(){
        var html =
                  "<p> You are doing great! </p>" +
            "<p>Now, let's try again.</p>" +
                "<p> Press the down arrow key when you have memorized what this little guy looks like. </p>"


         return html
       },
          stimuli_animation: function(){
              var html = "<p><img src='images/practice/instructions_example_spore0.gif' width ='400' height = '400' style='border:5px solid black'></p>"
              return html
          },
          key_response: [40],
          minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
            exposure_type: "self_paced"
        }


        var intro3 = {
            type: "instructions",
            pages: [
                "<p> However, once in a while, there will be a trial where you can not control how long you can see the creature. </p>" +
                "<p> In these trials, you can press the down arrow to go to the next trial <b>after</b> the creature disappears. </p>" +
                "Next, you will see what these trials look like."
              ],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}


            var intro4 = {

            type: 'stimuli-presentation',
          frame_animation: function(){
        var html = '<p>&nbsp;</p>' + '<p>&nbsp;</p>'+ '<p>&nbsp;</p>'+ 'This is an example trial. You can press the down arrow when the creature disappears!</p>' +

'<p><img src= images/blank.png width ="400" height = "400" style="position:absolute; top:40%; transform: translate(-50%, -50%);left:50%;border:5px solid black"></p>'


         return html
       },
          stimuli_animation: function(){
              var html = "<img src='images/practice/instructions_example_spore2.gif' width ='400' height = '400'>"
              return html
          },
          two_stimuli_interval: 0,
          key_response: [40],
          minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
                forced_short_viewing_duration:forced_short_viewing_duration,

                exposure_type: "forced_short"
        }



            var intro5 = {

            type: 'stimuli-presentation',
            frame_animation: function(){
        var html = '<p>&nbsp;</p>' + '<p>&nbsp;</p>'+ '<p>&nbsp;</p>'+ '<p>This is another example trial. You can press the down arrow when the creature disappears!</p>' +

'<p><img src= images/blank.png width ="400" height = "400" style="position:absolute; top:40%; transform: translate(-50%, -50%);left:50%;border:5px solid black"></p>'


         return html
       },
          stimuli_animation: function(){
              var html = "<img src='images/practice/instructions_example_spore2.gif' width ='400' height = '400'>"
              return html
          },
          two_stimuli_interval: 0,
          key_response: [40],
          minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
                forced_short_viewing_duration:forced_short_viewing_duration,
            exposure_type: "forced_short"
        }




        var intro6 = {
            type: "instructions",
            pages: [
                "<p> Pretty simple, huh? </p>" +
                "<p> But remember, in most trials, you can study each creature for as long as you like. </p>", 
                "<p> Please try your best to remember the details of the creatures.</p>"],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}

        var intro7 = {
            type: "instructions",
        pages: [             "<p> Before we get started, please know that if you experienced significant lag in the preceding animations, it will probably get better once we start the actual experiment. </p>" +
                            "<p> If the lagginess persists however, we would really appreciate if you could let us know in the feedback section at the end of the experiment. </p>",
                         
                            "<p> <b> The experiment begins now! </b> </p>"
            ],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}

        timeline.push(consent)
        timeline.push(intro0)
        timeline.push(intro1)
        timeline.push(intro2)
        timeline.push(intro3)
        timeline.push(intro4)
        timeline.push(intro5)
        timeline.push(intro6)
        timeline.push(intro7)


return timeline
}
