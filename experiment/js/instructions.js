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
        "<p>You will repeatedly see three walls on the screen, like these ones:</p>" +
        "<p><img src=images/stimuli/walls_all.jpg width ='960' height = '540' ></p>"
      ],
        data: {stimulus_type: 'instructions'},
        show_clickable_nav: true
      }



        var intro1 = {
          type: 'sequential-stimulus-presentation',
          wall_animation: function(){


        var html = "<video width ='960' height = '540' autoplay muted><source src=" + "images/stimuli/wall_3.mp4" + " type='video/mp4'></video>" +
                  "<p> On every trial, one of the walls will change color and a creature will appear behind it. </p>" +
                  "<p> To continue, <b> press the down arrow-key </b> on your keyboard. </p>" +
                  "<p> You can try it now! </p>"

         console.log(html)
         return html
       },
          stimuli_animation: function(){
              var html = "<p><img src='images/stimuli/instructions_example_spore1.gif' width ='200' height = '200' style='position:absolute;top:35%;left:65%'></p>"
              return html
          },
          two_stimuli_interval: 800,
          key_response: [40],
          minimum_viewing_duration: 800, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
        }


        var intro2 = {
          type: 'sequential-stimulus-presentation',
          wall_animation: function(){
        var html = "<p><video width ='960' height = '540' autoplay muted><source src=" + 'images/stimuli/wall_2.mp4' + ' type="video/mp4"></video></p>' +
                  "<p> Try again! Press the down arrow key when you've had enough of this little guy. </p>"

         console.log(html)
         return html
       },
          stimuli_animation: function(){
              var html = "<p><img src='images/stimuli/instructions_example_spore2.gif' width ='200' height = '200' style='position:absolute;top:35%;left:45%'></p>"
              return html
          },
          two_stimuli_interval: 800,
          key_response: [40],
          minimum_viewing_duration: 800, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
        }


        var intro3 = {
            type: "instructions",
            pages: [
                "<p> Pretty simple, huh? That means that you can go through the task at your own speed, </p>" +
                "<p> and you can look at each creature for as long as you like. </p>"],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}

        // enter preferences test here
        var intro4 = {
          type: 'html-keyboard-response',
          stimulus:  "<video width ='960' height = '540' autoplay muted><source src='images/stimuli/wall_pref.mp4' type='video/mp4'></video>",
          prompt: "<p> Every once in a while, you will have a chance to look behind one of the walls yourself! </p>" +
          "<p> You can look behind a wall that has already appeared to see the same creature again </p>" +
          "<p> or you can select a wall that hasn't opened yet! </p>" +
          "<p> You can choose which wall you'd like to open by <b> pressing the corresponding number key </b> on your keyboard! </p>" ,
          choices: [49, 50, 51, 97, 98, 99],
          data: {stimulus_type: 'instructions'},
          on_finish: function(data){
            if (data.key_press ==  49 || data.key_press == 97) {
              data.wall_pref = 1
              data.location = 'left'
              data.location_percent = '25%'

            }
            else if (data.key_press ==  50 || data.key_press == 98){
              data.wall_pref = 2
              data.location = 'middle'
              data.location_percent = '45%'

            }
            else if (data.key_press ==  51 || data.key_press == 99) {
              data.wall_pref = 3
              data.location = 'right'
              data.location_percent = '66%'


            }
          }
        }

        var intro5 = {
          type: 'sequential-stimulus-presentation',
          wall_animation: function(){
        var html = "<video width ='960' height = '540' autoplay muted><source src=" + 'images/stimuli/wall_' + jsPsych.data.get().last(1).values()[0].wall_pref + ".mp4" + ' type="video/mp4"></video>' +
        "<p> Again, press the down arrow to continue. </p>"
         console.log(html)
         return html
       },
          stimuli_animation: function(){
            example_stim_array = ['images/stimuli/instructions_example_spore0.gif', 'images/stimuli/instructions_example_spore2.gif', 'images/stimuli/instructions_example_spore1.gif']
              var html = "<p><img src='" + example_stim_array[jsPsych.data.get().last(1).values()[0].wall_pref - 1] +
              "' width ='200' height = '200' style='position:absolute;top:40%;left:"+ jsPsych.data.get().last(1).values()[0].location_percent + "'></p>"
              return html
          },
          two_stimuli_interval: 800,
          key_response: [40],
          minimum_viewing_duration: 800, // daffner2000's info was 600, changed to 200
          data: {block_number: block_index, stimulus_type: 'pref_reveal'},
          response_ends_trial: true,
        }

        var intro6 = {
            type: "instructions",
          pages: [          "<p> After you were presented with the creature in the ball you chose, </p>" +
                            "<p> the balls will be populated with new creatures, and the whole thing starts again! </p>" +
                            "<p> That means, new creatures will pop out, you can again look at them for as long as you like, </p>" +
                            "<p> and move to the next trial by pressing the down arrow. </p>",
                            "<p> We hope you enjoy our baby stimuli! </p>" +
                            "<p> The task should take no longer than 10 minutes, </p>" +
                            "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
                            "<p> and then you'll be all done! </p>",
                            "<p> Many thanks again for your participation. :) </p> ",
                            "<p> <b> The experiment begins now! </b> </p> <br></br>",
            ],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}


        /*        ,
                "<p>Your task is to simply look at the creature, </p>" +
                "<p>and to press the down arrow whenever you are ready to proceed to the next trial. </p>" +
                "<p> You can try now! </p>"

                ,
                ""
                ,
                "<p> Every couple of trials, you will have a chance to open one of the three balls yourself!" +
                "<p> You can open one of the balls that have already opened to see the same creature again </p>" +
                "<p> or you can select a ball that hasn't opened yet and be surprised! </p>"
                ,
                "<p> After you chose which ball to open, the creature in the ball will pop out." +

                ,
                "<p> We hope you enjoy our baby stimuli!" +
                "<p> The task should take no longer than 10 minutes, </p>" +
                "<p> after which we will ask you some questions about the stimuli for 2-3 minutes, </p>" +
                "<p> and then you'll be all done! </p>",
                "<p> Many thanks again for your participation. :) </p> ",
                "<p> Press the arrow to begin. </p> <br></br>",



              ],


        } */

        timeline.push(intro0)
        timeline.push(intro1)
        timeline.push(intro2)
        timeline.push(intro3)
        timeline.push(intro4)
        timeline.push(intro5)
        timeline.push(intro6)


return timeline
}
