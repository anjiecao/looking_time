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


        var square = document.createElement('div');
        square.style.position = 'absolute';
        square.style.top = '0px';
        square.style.left = '0px';
        square.style.width = "100%";
        square.style.height = "0px";
        square.style.backgroundColor = 'gray';

        var squareb = document.createElement('div');

        squareb.style.position = 'absolute';
        squareb.style.top = '0px';
        squareb.style.left = '0px';
        squareb.style.width = "100%";
        squareb.style.height = "100%";
        squareb.style.backgroundColor = 'gray';

        document.body.appendChild(square);
        document.body.appendChild(squareb);


        var squareSize = 5;
        var squareGrowthRate = 5;

        function curtainDrop() {
	        square.style.height = squareSize + 'px'
            squareSize += squareGrowthRate
        if (squareSize >= window.innerHeight){
  	        squareSize =  window.innerHeight
        }}

        function curtainRaise() {
            squareb.style.height =  (window.innerHeight - squareSize) + 'px'
            squareSize += squareGrowthRate
        if (squareSize == 0){
            squareSize = 0
  
        }}

        setInterval(curtainRaise, 5)




        // data saving
        var trial_data = {
          parameter_name: "parameter value",
        };
        // end trial
        this.jsPsych.finishTrial(trial_data);
      }
    }
    curtainDisplay.info = info;
  
    return curtainDisplay;
  })(jsPsychModule);