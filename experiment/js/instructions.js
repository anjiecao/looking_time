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
          type: 'sequential-stimulus-presentation',
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
          type: 'sequential-stimulus-presentation',
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
                "<p> Pretty simple, huh? That means that you can go through the task at your own speed, </p>" +
                "<p> and you can look at each creature for as long as you like. </p>"],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}

        var intro4 = {
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


return timeline
}
