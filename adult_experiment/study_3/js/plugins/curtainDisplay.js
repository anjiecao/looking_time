var curtainDisplay = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "curtain-display",
      parameters: {
        stimulus: {
          type: jspsych.ParameterType.IMAGE,
          default: null,
        },
        valid_key_press:{
          type: jspsych.ParameterType.ARRAY, 
          default: [" "]
        }
      },
    };
  
    /**
     * **PLUGIN-NAME**
     *
     * SHORT PLUGIN DESCRIPTION
     *
     * @author anjie_cao
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class curtainDisplay {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {


        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
        }

        var top_position = getRandomInt(45, 55)
        var left_postion = getRandomInt(45, 55)


        var context = new AudioContext()
        var audio_string = '<audio id="audio" controls style="display:none"> <source src="' + 
        "media/error.wav"+ '"</audio>'

        
        display_element.innerHTML = '<div class="outsideWrapper">\
        <div class="insideWrapper">\
            <img src="' + trial.stimulus + '" class="coveredImage test" style = "width:150px; height:150px;position:fixed; top:' + top_position + '%;\
            transform: translate(-50%, -50%);left:' + left_postion + '%">\
            <canvas id = "canvas" class="coveringCanvas"></canvas>\
        </div>\
    </div>'

        display_element.innerHTML  =  display_element.innerHTML  + audio_string


        

        var canvas = document.getElementById("canvas");
        canvas.width = canvas.scrollWidth
        canvas.height = canvas.scrollHeight

        var ctx = canvas.getContext('2d')

        ctx.fillStyle = "gray";

        var square_down = {x:0, y:0, width: canvas.width, height:10}
        var square_up = {x:0, y:0, width: canvas.width, height:canvas.height}


        function curtainDown(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            square_down.height += 12
            ctx.fillRect(square_down.x, square_down.y, square_down.width, square_down.height)
            
            window.requestAnimationFrame(curtainDown)
            
        }

        function curtainUp(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            square_up.height -= 12
            ctx.fillRect(square_up.x, square_up.y, square_up.width, square_up.height)


            window.requestAnimationFrame(curtainUp)
        }

        var trial_start = Date.now()
        curtainUp()


        const after_key_response = (info) => {
          
            curtainDown()
            
            // record the response time as data
            let data = {
              rt: info.rt,
              total_rt: 1000 + info.rt
            }

            console.log(data.rt)

            this.jsPsych.pluginAPI.setTimeout(()=>{
              this.jsPsych.finishTrial(data)
            }, 800);
          }
          
            // hide the image
            
            
           
          
        
          // set up a keyboard event to respond only to the spacebar
          var annoying_sound_listener = this.jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: function(){
                context.resume().then(() => {
                  display_element.querySelector('#audio').play()
              });             
              },//after_key_response,
            valid_responses: trial.valid_key_press,
            persist: true
          });



          this.jsPsych.pluginAPI.setTimeout(()=>{
            jsPsych.pluginAPI.cancelKeyboardResponse(annoying_sound_listener);
          }, 1000)

          this.jsPsych.pluginAPI.setTimeout(()=>{
            this.jsPsych.pluginAPI.getKeyboardResponse({
              callback_function: after_key_response,
              valid_responses: trial.valid_key_press,
              persist: false
            });


          }, 1000)


        //draw()

        //<img src="media/stimuli/complex_2.gif"></img>`;




        //this.jsPsych.finishTrial(data);
    

        // set up a keyboard event to respond only to the spacebar
   




      }

     

    }
    curtainDisplay.info = info;
  
    return curtainDisplay;
  })(jsPsychModule);