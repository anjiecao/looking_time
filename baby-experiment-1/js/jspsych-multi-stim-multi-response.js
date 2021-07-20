/**
 * jspsych-multi-stim-multi-response
 * Josh de Leeuw
 *
 * plugin for displaying a set of stimuli and collecting a set of responses
 * via the keyboard
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["multi-stim-multi-response"] = (function() {

  var plugin = {};
    
    
 plugin_parameters = {
    "name" : "multi-stim-multi-response",
    "parameters" : [
        {
            "name" : "stimuli",
          "type" : ["array"],
          "label": "Stimuli"
        },
        {
            "name" : "is_html", 
          "type": ["boolean"],
          "label": "Is HTML", 
          "default" : false
        },
        {
            "name" : "choices", 
          "type": ["array"],
          "label": "Choices"
        },
        {
            "name" : "prompt", 
          "type": ["string"],
          "label": "Prompt", 
          "default": " "

        },
        {
            "name" : "timing_stim", 
          "type": ["array"],
          "label": "Timing Stim", 
          "default": [1000,1000,1000]
        },
        {
            "name" : "timing_response", 
          "type": ["number"],
          "label": "Timing Response", 
          "default": -1
        },
        {
            "name" : "response_ends_trial", 
          "type": ["boolean"],
          "label": "Response Ends Trials", 
          "default": true
        }
     ]
  }    
    
  plugin.info = {
    name: 'multi-stim-multi-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      choices_for_target:{
          type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The key the subjects supposed to press when seeing the target'
          
      },
        
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
        
      minimum_viewing_duration:{
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'minimum viewing time duration',
        default: 0,
        description: 'minimum time the participants need to look at the stimuli'
          
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
        
        
      block_group_type: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Block group type',
        default: null,
        description: 'type of background stimuli used, "simple_a", "simple_b", "complex_a", "complex_b"'  
      },    
        
      block_type:{
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Block type',
        default: null,
        description: 'relationship between the background and the deviant, "simple_similar", "simple_dissimilar", "complex_similar", "complex_dissimilar"'  
      },
        
      block_background: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Block background',
        default: null,
        description: 'the background stimulus used in this block'  
      },
        
      block_deviant: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Block deviant',
        default: null,
        description: 'the deviant stimulus used in this block'  
      },
        
      deviant_position: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'deviant position',
        default: 8,
        description: 'the position that deviant stimulus occurs'
          
      },
        
      block_length: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'block length',
        default: 10,
        description: 'the number of trials in one block'
          
      }
        

  }
  }    
    
    
    
    
    
    
    
    
    
    
    
    
    

 // jsPsych.pluginAPI.registerPreload('multi-stim-multi-response', 'stimuli', 'image');

  plugin.trial = function(display_element, trial) {

    // default parameters
    trial.response_ends_trial = (typeof trial.response_ends_trial === 'undefined') ? true : trial.response_ends_trial;
    // timing parameters
    var default_timing_array = [];
    for (var j = 0; j < trial.stimuli.length; j++) {
      default_timing_array.push(1000);
    }
    trial.timing_stim = trial.timing_stim || default_timing_array;
    trial.timing_response = trial.timing_response || -1; // if -1, then wait for response forever
    // optional parameters
    trial.is_html = (typeof trial.is_html === 'undefined') ? false : trial.is_html;
    trial.prompt = (typeof trial.prompt === 'undefined') ? "" : trial.prompt;

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // this array holds handlers from setTimeout calls
    // that need to be cleared if the trial ends early
    var setTimeoutHandlers = [];

    // array to store if we have gotten a valid response for
    // all the different response types
    var validResponses = [];
    for (var i = 0; i < trial.choices.length; i++) {
      validResponses[i] = false;
    }

    // array for response times for each of the different response types
    var responseTimes = [];
    for (var i = 0; i < trial.choices.length; i++) {
      responseTimes[i] = -1;
    }

    // array for response keys for each of the different response types
    var responseKeys = [];
    for (var i = 0; i < trial.choices.length; i++) {
      responseKeys[i] = -1;
    }

    // function to check if all of the valid responses are received
    function checkAllResponsesAreValid() {
      for (var i = 0; i < validResponses.length; i++) {
        if (validResponses[i] == false) {
          return false;
        }
      }
      return true;
    }

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      for (var i = 0; i < setTimeoutHandlers.length; i++) {
        clearTimeout(setTimeoutHandlers[i]);
      }

      // kill keyboard listeners
      jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

      // gather the data to store for the trial
      var trial_data = {
        "rt": JSON.stringify(responseTimes),
        "stimulus": JSON.stringify(trial.stimuli),
        "key_press": JSON.stringify(responseKeys)
      };

      // clear the display
      display_element.html('');

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      var whichResponse;
      for (var i = 0; i < trial.choices.length; i++) {

        // allow overlap between response groups
        if (validResponses[i]) {
          continue;
        }

        for (var j = 0; j < trial.choices[i].length; j++) {
          keycode = (typeof trial.choices[i][j] == 'string') ? jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.choices[i][j]) : trial.choices[i][j];
          if (info.key == keycode) {
            whichResponse = i;
            break;
          }
        }

        if (typeof whichResponse !== 'undefined') {
          break;
        }
      }

      if (validResponses[whichResponse] != true) {
        validResponses[whichResponse] = true;
        responseTimes[whichResponse] = info.rt;
        responseKeys[whichResponse] = info.key;
      }

      if (trial.response_ends_trial) {

        if (checkAllResponsesAreValid()) {
          end_trial();
        }

      }

    };

    // flattened version of the choices array
    var allchoices = [];
    for (var i = 0; i < trial.choices.length; i++) {
      allchoices = allchoices.concat(trial.choices[i]);
    }

    var whichStimulus = 0;

    function showNextStimulus() {

      // display stimulus
      if (!trial.is_html) {
        display_element.append($('<img>', {
          src: trial.stimuli[whichStimulus],
          id: 'jspsych-multi-stim-multi-response-stimulus'
        }));
      } else {
        display_element.append($('<div>', {
          html: trial.stimuli[whichStimulus],
          id: 'jspsych-multi-stim-multi-response-stimulus'
        }));
      }

      //show prompt if there is one
      if (trial.prompt !== "") {
        display_element.append(trial.prompt);
      }

      if (typeof trial.timing_stim[whichStimulus] !== 'undefined' && trial.timing_stim[whichStimulus] > 0) {
        var t1 = setTimeout(function() {
          // clear the display, or hide the display
          if (typeof trial.stimuli[whichStimulus + 1] !== 'undefined') {
            display_element.html('');
            // show the next stimulus
            whichStimulus++;
            showNextStimulus();
          } else {
            $('#jspsych-multi-stim-multi-response-stimulus').css('visibility', 'hidden');
          }

        }, trial.timing_stim[whichStimulus]);

        setTimeoutHandlers.push(t1);
      }

    }

    // show first stimulus
    showNextStimulus();

    // start the response listener
    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: allchoices,
      rt_method: 'date',
      persist: true,
      allow_held_key: false
    });

    // end trial if time limit is set
    if (trial.timing_response > 0) {
      var t2 = setTimeout(function() {
        end_trial();
      }, trial.timing_response);
      setTimeoutHandlers.push(t2);
    }

  };

  return plugin;
})();

