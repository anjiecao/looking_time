/**
 * jspsych-html-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["sequential-stimulus-presentation"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'sequential-stimulus-presentation',
    description: '',
    parameters: {

     wall_animation: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'wall_animation',
        default: undefined,
        description: 'The HTML string to be displayed first'
      },

      stimuli_animation: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'stimulus',
        default: undefined,
        description: 'The HTML string to be displayed first'
      },

      two_stimuli_interval: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'interval between playing first and second',
        default: undefined,
        description: 'The HTML string to be displayed first'
      },

      key_response: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
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
  plugin.trial = function(display_element, trial) {

    var html_string = '<div id="stimuli-animation">' + trial.stimuli_animation + '</div>' + '<div id="wall">'+ trial.wall_animation+'</div>';

    display_element.innerHTML = html_string;

    display_element.querySelector('#stimuli-animation').style.visibility = 'hidden'

    jsPsych.pluginAPI.setTimeout(function() {

        display_element.querySelector('#stimuli-animation').style.visibility = 'visible';
                                    }, trial.two_stimuli_interval);

    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        //"block_type": trial.block_type,
        "trial_stimulus": trial.stimulus,
        //"trial_stimulus_type": trial_stimulus_type,
        "key_press": response.key,
        "minimum_viewing_duration":trial.minimum_viewing_duration,
        "trial_looking_time": trial.minimum_viewing_duration + response.rt,

      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
   var after_response = function(info) {
      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#stimuli-animation').className += ' responded';




        if (response.key == null){
          response = info
        }

       jsPsych.pluginAPI.cancelAllKeyboardResponses()
        if(trial.response_ends_trial) {

            end_trial();
        }
      // if pressed the space bar

   display_element.querySelector('#stimuli-animation').className = '';



    };


if (trial.key_response != jsPsych.NO_KEYS){

        jsPsych.pluginAPI.setTimeout(function() {
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.key_response,
        rt_method: 'performance',
        persist: true,
        allow_held_key: false
      });

      }, trial.minimum_viewing_duration)





}



    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
