function get_instructions_and_practice(){


var forced_short_viewing_duration = 500

var find_space_bar = {

  type: 'stimuli-presentation',
          frame_animation: function(){


            var html =
            ""

            return html
          },
            //position:absolute;top:28px;left:40px
              stimuli_animation: function(){
                  var html = "<img src='images/spacebar.jpg'>"
                return html 
              },
              two_stimuli_interval: 0,
              key_response: [32],
              minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
              response_ends_trial: true,
              exposure_type: "self_paced"


    }


var great_job = {

  type: 'stimuli-presentation',
          frame_animation: function(){


            var html =
            ""

            return html
          },
            //position:absolute;top:28px;left:40px
              stimuli_animation: function(){
                  var html = "<img src='images/greatjob.gif'>"
                return html 
              },
              two_stimuli_interval: 0,
              key_response: [32],
              minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
              response_ends_trial: true,
              exposure_type: "self_paced"


    }

    

      

        
        var first_example = {
          type: 'stimuli-presentation',
          frame_animation: function(){
            var html =""
            return html
          },
            //position:absolute;top:28px;left:40px
              stimuli_animation: function(){
                  var html = 
                 
                  "<img src='images/practice/instructions_example_spore1.gif' width ='400' height = '400' style='border:5px solid black'>"
                  return html
              },
              two_stimuli_interval: 0,
              key_response: [32],
              minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
              response_ends_trial: true,
              exposure_type: "self_paced"
        }

        var look_carefully = {
          type: 'stimuli-presentation',
          frame_animation: function(){
            var html =""
            return html
          },
            //position:absolute;top:28px;left:40px
              stimuli_animation: function(){
                  var html = 
                 
                  "<img src='images/look.png'>"
                  return html
              },
              two_stimuli_interval: 0,
              key_response: [32],
              minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
              response_ends_trial: true,
              exposure_type: "self_paced"
        }


        final_stickers = get_final_sticker_html_array(8)

       var sticker_books = {

        type: 'stimuli-presentation',
        frame_animation: function(){


          var html = ""

          return html
        },
          //position:absolute;top:28px;left:40px
            stimuli_animation: function(){
                var html = final_stickers.join("")
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
              
              "<p> Pretty simple, huh? </p>" +
             "<p> You need to pay close attention to the monsters! </p>" + 
             "<p>Once in a while, we will ask you about the monster. </p>" + 
             "<p>I\'m sure you will do great! Let\'s give it a try! </p>"
              return html
          },
          key_response: [32],
          minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
          response_ends_trial: true,
            exposure_type: "self_paced"
        }

        var practice_block = {
          timeline: [
            {
                type: 'html-keyboard-response',
                stimulus: '<p><img src= images/blank.png width ="600" height = "600" style="position:fixed;top:50%; left:50%; transform: translate(-50%, -50%); border:5px solid black">',
                trial_duration: function(){
                    var random_duration = 800 + 500 * Math.random() 
                    return random_duration  } ,
                choices: jsPsych.NO_KEYS
            },
            {
                type: 'stimuli-presentation',
                frame_animation: function(){
                    var html =  '<p><img src= images/blank.png width ="600" height = "600" style="position:fixed; top:50%; transform: translate(-50%, -50%);left:50%;border:5px solid black">'
                   
                    return html;
                },
                
              stimuli_animation: function(){
                    function getRandomInt(max) {
                        return Math.floor(Math.random() * max);
                        }
                    var width_height = parseFloat(Math.floor(Math.random() * 10) + 250);
                    var html = "<p><img src="+jsPsych.timelineVariable('stimuli', true)+" width ='" + width_height + "' height = '" + width_height + "' style='position:relative;top:" + Math.random() * (80 - 10) + 10 + "%;left:" +  Math.random() * (80 - 10) + 10  +  "%'></p>"
                    return html
                },
           
                block_deviant: block_information.deviant_stimuli,
                block_background: block_information.background_stimuli,
                key_response: [32],
                first_trial: function(){
                    return jsPsych.timelineVariable('first_trial', true)
                }, 
                minimum_viewing_duration: 500, // in non-first trial and self-paced first trial, 
                forced_short_viewing_duration: 10 * (getRandomInt(forced_short_viewing_duration_base, 100)), //50 ~ 1000 with 10 interval random
                forced_long_viewing_duration: forced_long_viewing_duration,
                response_ends_trial: true,
                exposure_type: exposure_type
            }
            ],
            timeline_variables: [{stimuli: "images/practice/instructions_example_spore2.gif", 
                                  stim_type: "background", 
                                  exposure_type: "self_paced", 
                                  first_trial: true}, 
                                  {stimuli: "images/practice/instructions_example_spore2.gif", 
                                  stim_type: "background", 
                                  exposure_type: "self_paced", 
                                  first_trial: false}, 
                                  {stimuli: "images/practice/instructions_example_spore2.gif", 
                                  stim_type: "background", 
                                  exposure_type: "self_paced", 
                                  first_trial: false}
                                 ]
            }

        

        var practice_memory = {
                  type: "survey-multi-choice",
                  preamble: '<p><img src= ' +  "images/practice/instructions_example_spore2.gif" + ' width ="400" height = "400"</p>',
                  questions: [
                    {prompt: 'Did you look at this monster before?', // actually we can request control from the participants 
                    options: ["Yes", "No"], 
                    required: false, 
                    horizontal: true},
                  ],
                  data: {stimulus_type: 'memory_test_practice',
                        memory_question_stimuli: "images/practice/instructions_example_spore2.gif", 
                        memory_block_index: 0 },
          }

        var intro3 = {
            type: 'stimuli-presentation',
            frame_animation: function(){
              var html = ""
           return html
         },
            stimuli_animation: function(){
                var html = 
               
               "<img src='images/spacebar.jpg'>"
                return html
            },
            key_response: [32],
            minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
            response_ends_trial: true,
              exposure_type: "self_paced"
          }


var instruction_and_practice = [
            find_space_bar, 
            great_job, 
            first_example, 
            great_job, 
            look_carefully, 
            practice_block, 
            practice_memory, 
            sticker_books, 
            intro3
                          ]


return instruction_and_practice
}

