function instructions(timeline){

var intro0 = {
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



        var intro1 = {
          type: 'sequential-stimulus-presentation-old',
          wall_animation: function(){


        var html =
                  "<p> On every trial, a creature will appear in the frame. </p>" +
                  "<p> To continue, <b> press the down arrow-key </b> on your keyboard. </p>" +
                  "<p> You can try it now! </p>"

         console.log(html)
         return html
       },
        //position:absolute;top:28px;left:40px
          stimuli_animation: function(){
              var html = "<img src='images/stimuli/instructions_example_spore1.gif' width ='400' height = '400' style='border:5px solid black'>"
              return html
          },
          two_stimuli_interval: 0,
          key_response: [40],
          minimum_viewing_duration: 600, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
        }


        var intro2 = {
          type: 'sequential-stimulus-presentation-old',
          wall_animation: function(){
        var html =
                  "<p> You are doing great! </p>" +
            "<p>Now, let's try again.</p>" +
                "<p> Press the down arrow key when you've had enough of this little guy. </p>"


         console.log(html)
         return html
       },
          stimuli_animation: function(){
              var html = "<p><img src='images/stimuli/instructions_example_spore0.gif' width ='400' height = '400' style='border:5px solid black'></p>"
              return html
          },
          two_stimuli_interval: 0,
          key_response: [40],
          minimum_viewing_duration: 600, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
        }


        var intro3 = {
            type: "instructions",
            pages: [
                "<p> In the real experiment, you will find that the frame turns <span style='color:red;'>red</span> a short while after the creature appeared. </p>" +
                "<p> This just signals that the keyboard has been activated and you are OK to move on to the next creature when you are ready. </p>" +
                "<p> You can see how a regular trial will look like next. <b> Remember to press the down arrow when you've had enough of the creature. <b> </p>"
              ],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}


            var intro4 = {
              type: 'sequential-stimulus-presentation',
              frame_animation: function(){
                  var html =  '<p><img src= images/blank.png width ="600" height = "600" style="position:fixed; top:50%; transform: translate(-50%, -50%);left:50%;border:5px solid black">'

                  //var html = "<video width ='960' height = '540' autoplay muted><source src=" + jsPsych.timelineVariable('wall_animation', true) + ' type="video/mp4"></video>'
                  //var html = "<img src= "+ "images/stimuli/pokeball_1.gif" +" width ='800' height = '200'></p>"
                  return html;
              },

            stimuli_animation: function(){
                var html = "<img src='images/stimuli/instructions_example_spore2.gif' width ='400' height = '400'>"
                  return html
              },

            red_frame_animation: function(){
                  var html =  '<p><img src= images/blank.png width ="600" height = "600" style="position:fixed;top:50%; left:50%; transform: translate(-50%, -50%); border:5px solid red">'
                  //var html = "<img src= "+ "images/stimuli/pokeball_1.gif" +" width ='800' height = '200'></p>"
                  return html;
              },
              two_stimuli_interval: 0,
              key_response: [40],
              minimum_viewing_duration: 600, // daffner2000's info was 600, changed to 200
              response_ends_trial: true,
              red_frame_onset: 1000,
            }


        var intro5 = {
            type: "instructions",
            pages: [
                "<p> Pretty simple, huh? That means that you can go through the task at your own speed, </p>" +
                "<p> and you can look at each creature for as long as you like. </p>"],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}

        var intro6 = {
            type: "instructions",
        pages: [            "<p> After some trials, you will be asked a <b> simple math question </b> before moving to the next frame, in which new creatures will appear! </p>" +
                            "<p> That means, new creatures will appear, you can again look at them for as long as you like, </p>" +
                            "<p> and move to the next trial by pressing the down arrow. </p>",
                            "<p> We hope you enjoy our baby stimuli! </p>" +
                            "<p> The task should take no longer than 6 minutes, </p>" +
                            "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
                            "<p> and then you'll be all done! </p>",
                            "<p> Many thanks again for your participation. :) </p> ",
                            "<p> <b> The experiment begins now! </b> </p> <br></br>",
            ],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}

        timeline.push(intro0)
        timeline.push(intro1)
        timeline.push(intro2)
        timeline.push(intro3)
        timeline.push(intro4)
        timeline.push(intro5)
        timeline.push(intro6)


return timeline
}
