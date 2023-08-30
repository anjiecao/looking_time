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
        }, 

        familiarization_time: {
          type: jspsych.ParameterType.INT, 
          default: 3000 
        }, 

        familiarization_phase:{
          type:jspsych.ParameterType.BOOLEAN,
          default: false
        },
        demo_mode:{
          type:jspsych.ParameterType.BOOLEAN,
          default: false
        }, 
        demo_string:{
          type:jspsych.ParameterType.STRING,
          default: "<p>Press the space bar whenever you have seen enough.</p> " 
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


        //var audio_string = '<audio id="audio" controls style="display:none"> <source src="' + 
        //"media/error.wav"+ '"</audio>'

        var bell_sound = '<audio id="audio" controls style="display:none" playsinline> <source src="' + 
        "media/ding.mp3"+ '"</audio>'

        //var silence = '<iframe src="media/silence.mp3" allow="autoplay" id="audio" style="display: none"></iframe>'


        var test_stimulus = trial.stimulus
        //var test_stimulus = "<video playsinline autoplay muted loop width = '320' height = '240' style='z-index: 0;'><source src = 'media/animal_stim/unitystims_001_Left_2fam_background_1_new.mp4' type = 'video/mp4'>"

        if (trial.demo_mode == false){
          display_element.innerHTML = '<div class="outsideWrapper">\
          <div class="insideWrapper">' + 
          test_stimulus + 
            '<canvas id = "canvas" class="coveringCanvas"></canvas>\
          </div>\
      </div>'
  
          display_element.innerHTML  =  display_element.innerHTML + bell_sound

        }else{
          display_element.innerHTML = trial.demo_string + '<div class="outsideWrapper">\
          <div class="insideWrapper">' + 
          test_stimulus + 
            '<canvas id = "canvas" class="coveringCanvas"></canvas>\
          </div>\
      </div>'

      display_element.innerHTML  =  display_element.innerHTML  + audio_string

        }
       


        

        var canvas = document.getElementById("canvas");
        canvas.width = canvas.scrollWidth
        canvas.height = canvas.scrollHeight

        var ctx = canvas.getContext('2d')

        ctx.fillStyle = "gray";

        //var square_down = {x:0, y:0, width: canvas.width, height:10}
        //var square_up = {x:0, y:0, width: canvas.width, height:canvas.height}

        var square_left = {x:0, y:0, width: 0, height:canvas.height}
        var square_right = {x:canvas.width, y:0, width: 0, height:canvas.height}

        var left_curtain = {x: canvas.width / 2 , y: 0, width: canvas.width / 2, height: canvas.height};
        var right_curtain = {x: canvas.width / 2, y: 0, width: canvas.width / 2, height: canvas.height};


function curtain_open_from_middle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  left_curtain.x -= 18;  // Adjust the movement speed as needed
  left_curtain.width -= 18;  // Adjust the opening speed as needed

  right_curtain.width -= 18;  // Adjust the opening speed as needed
  right_curtain.x += 18


  ctx.fillRect(left_curtain.x - left_curtain.width, left_curtain.y, left_curtain.width, left_curtain.height);
  ctx.fillRect(right_curtain.x, right_curtain.y, right_curtain.width, right_curtain.height);

  if (left_curtain.width < canvas.width / 2) {
      window.requestAnimationFrame(curtain_open_from_middle);
  }
}



        function curtain_to_right(){
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          square_left.width += 18
          ctx.fillRect(square_left.x, square_left.y, square_left.width, square_left.height)
          
          window.requestAnimationFrame(curtain_to_right)
          
      }
        
      function curtain_to_left(){
        ctx.clearRect(canvas.width, 0, canvas.width, canvas.height)
        //square_right.width += 18
        square_right.x -= 18;
        square_right.width += 18;
        ctx.fillRect(square_right.x, square_right.y, square_right.width, square_right.height)
        
        window.requestAnimationFrame(curtain_to_left)
        
    }



        function curtainDown(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            square_down.height += 18
            
            ctx.fillRect(square_down.x, square_down.y, square_down.width, square_down.height)
            
            window.requestAnimationFrame(curtainDown)
            
        }

        function curtainUp(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            square_up.height -= 18
            ctx.fillRect(square_up.x, square_up.y, square_up.width, square_up.height)


            window.requestAnimationFrame(curtainUp)
        }

      
        curtain_open_from_middle()

        if (trial.familiarization_phase == false){
          display_element.querySelector('#audio').play()
        }


        const after_key_response = (info) => {
          
            //curtainDown()
            curtain_to_right()
            curtain_to_left()

            // record the response time as data
            let data = {
              rt: info.rt,
              total_rt: 500 + info.rt
            }

            console.log(data.rt)

            this.jsPsych.pluginAPI.setTimeout(()=>{
              this.jsPsych.finishTrial(data)
            }, 500);
          }
                      
          
        
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
          }, 500)


          if (trial.familiarization_phase == false){

            

            this.jsPsych.pluginAPI.setTimeout(()=>{
              this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_key_response,
                valid_responses: trial.valid_key_press,
                persist: false
              });
  
  
            }, 500)
          }else{
            this.jsPsych.pluginAPI.setTimeout(()=>{
              curtain_to_right()
              curtain_to_left()
            }, trial.familiarization_time);
            
            //move to next trial given certain time
            this.jsPsych.pluginAPI.setTimeout(()=>{
              
              
              this.jsPsych.finishTrial()
            }, trial.familiarization_time + 500);

            

          }
    


        //draw()

        //<img src="media/stimuli/complex_2.gif"></img>`;




        //this.jsPsych.finishTrial(data);
    

        // set up a keyboard event to respond only to the spacebar
   




      }

     

    }
    curtainDisplay.info = info;
  
    return curtainDisplay;
  })(jsPsychModule);