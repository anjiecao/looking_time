function get_instructions_and_practice(timeline){


var forced_short_viewing_duration = 500

var intro0 = {

  type: 'stimuli-presentation',
          frame_animation: function(){


            var html =
            ""

            return html
          },
            //position:absolute;top:28px;left:40px
              stimuli_animation: function(){
                  var html = "<p>Hello! Thank you very much for playing our games today!</p><br></br>" +
                  "<p>Before we start with our game, let's find the space bar on the keyboard together. </p>" + 
                  "<p>Can you find it? When you found it, feel free to press it!</p>" + 
                  "<p>This is a space bar:</p>"  + 
                  "<img src='images/spacebar.jpg'>"
                return html 
              },
              two_stimuli_interval: 0,
              key_response: [32],
              minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
              response_ends_trial: true,
              exposure_type: "self_paced"


    }


  


        var intro1 = {
          type: 'stimuli-presentation',
          frame_animation: function(){
            var html =""
            return html
          },
            //position:absolute;top:28px;left:40px
              stimuli_animation: function(){
                  var html = 
                  "<p>Great job!</p>" + 
                  "<p>Now, we are going to watch some cute monsters together.</p>" + 
                  "<p> You can watch the monster for as long as want! </p>" +
                      "<p> When you are bored, <b> press the space bar </b> on your keyboard. </p>" +
                      "<p> You can try it now! </p>" + 
                  "<img src='images/practice/instructions_example_spore1.gif' width ='400' height = '400' style='border:5px solid black'>"
                  return html
              },
              two_stimuli_interval: 0,
              key_response: [32],
              minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
              response_ends_trial: true,
              exposure_type: "self_paced"
        }


        var intro2 = {
          type: 'stimuli-presentation',
          frame_animation: function(){
            var html = ""
         return html
       },
          stimuli_animation: function(){
              var html = 
              
              "<p> You are doing great! </p>" +
            "<p>Now, let's try again.</p>" +
                "<p> Press the space bar when you've had enough of this little guy. </p>" + 
              "<p><img src='images/practice/instructions_example_spore0.gif' width ='400' height = '400' style='border:5px solid black'></p>"
              return html
          },
          key_response: [32],
          minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
            exposure_type: "self_paced"
        }


        var intro3 = {
          type: 'stimuli-presentation',
          frame_animation: function(){
            var html = ""
         return html
       },
          stimuli_animation: function(){
              var html = 
              
              "<p> Pretty simple, huh? </p>" +
             "<p> You need to pay close attention to the monsters! </p>" + 
             "<p>Once in a while, we will ask you about the monster. </p>" + 
             "<p>I\'m sure you will do great! When you are ready to begin the game, press the space bar again! </p>"
              return html
          },
          key_response: [32],
          minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
            exposure_type: "self_paced"
        }


        timeline.push(intro0)
        timeline.push(intro1)
        timeline.push(intro2)
        timeline.push(intro3)
        //timeline.push(intro7)


return timeline
}
