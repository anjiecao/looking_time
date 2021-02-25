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
        "<p>You will repeatedly a wall on the screen, like this one:</p>" +
        "<p><img src=images/stimuli/wall.jpg width ='960' height = '540' ></p>"
      ],
        data: {stimulus_type: 'instructions'},
        show_clickable_nav: true
      }



        var intro1 = {
          type: 'sequential-stimulus-presentation',
          wall_animation: function(){


        var html = "<video width ='960' height = '540' autoplay muted><source src=" + "images/stimuli/wall.mp4" + " type='video/mp4'></video>" +
                  "<p> On every trial, the wall will disappear and a creature will appear behind it. </p>" +
                  "<p> To continue, <b> press the down arrow-key </b> on your keyboard. </p>" +
                  "<p> You can try it now! </p>"

         console.log(html)
         return html
       },
          stimuli_animation: function(){
              var html = "<p><img src='images/stimuli/instructions_example_spore1.gif' width ='300' height = '300' style='position:absolute;top:28%;left:40%'></p>"
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
        var html = "<p><video width ='960' height = '540' autoplay muted><source src=" + 'images/stimuli/wall.mp4' + ' type="video/mp4"></video></p>' +
                  "<p> Try again! Press the down arrow key when you've had enough of this little guy. </p>"

         console.log(html)
         return html
       },
          stimuli_animation: function(){
              var html = "<p><img src='images/stimuli/instructions_example_spore2.gif' width ='300' height = '300' style='position:absolute;top:28%;left:40%'></p>"
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

        var intro4 = {
            type: "instructions",
        pages: [            "<p> After some trials, you will be prompted to move to the next wall, behind which there are new creatures! </p>" +
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
