var curtainDisplay = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "curtain-display",
      parameters: {
        parameter_name: {
          type: jspsych.ParameterType.INT,
          default: undefined,
        },
        parameter_name2: {
          type: jspsych.ParameterType.IMAGE,
          default: undefined,
        },
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


        /*
        display_element.innerHTML = '<div id="scene" align = "center"> \
        <img src="media/gray.png" id="curtain"></img>'

        var goUp = function() {
            $("curtain").animate({ "top": "-=110px" }, 1000, "linear");
            console.log("??")
            
        };
        */

/*
        display_element.innerHTML = '\
        <img src="media/stimuli/complex_2.gif"></img>\
        <canvas id="canvas" style = "border: 1px solid; width: 500px; height: 500px"></canvas>\
       '

*/ 
        display_element.innerHTML = '<div class="outsideWrapper">\
        <div class="insideWrapper">\
            <img src="media/stimuli/complex_2.gif" class="coveredImage" style = "width:100px; height:100px;position:fixed; top:50%; transform: translate(-50%, -50%);left:50%">\
            <canvas id = "canvas" class="coveringCanvas"></canvas>\
        </div>\
    </div>'

        var canvas = document.getElementById("canvas");
        canvas.width = canvas.scrollWidth
        canvas.height = canvas.scrollHeight

        var ctx = canvas.getContext('2d')

        ctx.fillStyle = "gray";

        var square_down = {x:0, y:0, width: canvas.width, height:10}
        var square_up = {x:0, y:0, width: canvas.width, height:canvas.height}


        function curtainDown(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            square_down.height += 7
            ctx.fillRect(square_down.x, square_down.y, square_down.width, square_down.height)
            
            window.requestAnimationFrame(curtainDown)
            


        }

        function curtainUp(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            square_up.height -= 7
            ctx.fillRect(square_up.x, square_up.y, square_up.width, square_up.height)


            window.requestAnimationFrame(curtainUp)
        }


        curtainUp()


        const after_key_response = (info) => {
            // hide the image
            curtainDown()
            // record the response time as data
            let data = {
              rt: info.rt
            }

            this.jsPsych.pluginAPI.setTimeout(()=>{
              this.jsPsych.finishTrial(data)
            }, 1200);
            
           
          }
        
          // set up a keyboard event to respond only to the spacebar
          this.jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: after_key_response,
            valid_responses: [' '],
            persist: false
          });


        //draw()

        //<img src="media/stimuli/complex_2.gif"></img>`;




        //this.jsPsych.finishTrial(data);
    

        // set up a keyboard event to respond only to the spacebar
   




      }

     

    }
    curtainDisplay.info = info;
  
    return curtainDisplay;
  })(jsPsychModule);