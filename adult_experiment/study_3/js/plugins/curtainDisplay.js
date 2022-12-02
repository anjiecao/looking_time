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


        display_element.innerHTML = `<img src="media/stimuli/complex_2.gif"></img>`;



        const after_key_response = (info) => {
        // hide the image
        var square = document.createElement('div');
        square.style.width = '100%';
        square.style.height = '100px';
        square.style.backgroundColor = 'gray';
        square.style.position = 'absolute';
        square.style.top = '0px';
        document.body.appendChild(square);

        function loweringCurtain() {
            if (top > window.innerHeight){
            square.style.height= "100%"
            clearInterval(id2);
        } else {
            top = top + 5;
            square.style.height = top + 'px';
            console.log(square.style.top)
        }
        }

        var id2 = setInterval(loweringCurtain, 1)

        // record the response time as data
        let data = {
            rt: info.rt
        }

        // end the trial

        this.jsPsych.pluginAPI.setTimeout(()=>{
            this.jsPsych.finishTrial(data);
          }, 5000);
        


        //this.jsPsych.finishTrial(data);
        }

        // set up a keyboard event to respond only to the spacebar
    this.jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_key_response,
        valid_responses: [' '],
        persist: false
    });



/*

        var img = document.createElement("img");
        img.src = "media/stimuli/complex_2.gif";
        img.style.position = 'absolute'
        img.style.top = '50%'
        img.style.left = '50%'
        img.style.width = "250px"
        img.style.height = "250px"

        document.body.appendChild(img);

        

      




        var top = 0;
        //var id = setInterval(raisingCurtain, 1);


        const after_key_response = (info) => {
            var id2 = setInterval(loweringCurtain, 1);
            display_element.innerHTML = ""
            this.jsPsych.finishTrial(data)

            let data = {
                rt:info.rt
            }
            console.log("end trial???")
        }



        function raisingCurtain() {
            if (top == -window.innerHeight) {
            clearInterval(id);
        } else {
            top = top -5;
            square.style.top = top + 'px';
        }
        }

       

        // data saving
        var trial_data = {
          parameter_name: "parameter value",
        };
       

         // set up a keyboard event to respond only to the spacebar
        this.jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_key_response,
        valid_responses: [' '],
        persist: false
     });
*/
      }

     

    }
    curtainDisplay.info = info;
  
    return curtainDisplay;
  })(jsPsychModule);