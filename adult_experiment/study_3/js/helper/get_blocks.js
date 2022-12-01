
// loop through all combo and create blocks 

function generate_html_string_for_stimulus(stimulus_path){
    // html_string = '<img src="' + 
    //                stimulus_path + 
    //               '" width="300px">'
    html_string = '<img src="' + 
                   stimulus_path + 
                  '" style="width:300px;height:300px;object-fit:cover;border: 5px solid #555">'
    return(html_string)
 }
 
 
 function generate_block(stimuli_pair, exposure_length, interval_length){
     
     shuffleArray(stimuli_pair)
     fam_stimulus = generate_html_string_for_stimulus(stimuli_pair[0])
     novel_stimulus = generate_html_string_for_stimulus(stimuli_pair[1])


    var buffer = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus:  "<p>Get ready to look at the pixel animations!</p><p>Press any key to start viewing the stimulus.</p>",
        choices: "ALL_KEYS",
        response_ends_trial: true,

    }

 
     // get the familiarization trial 
     var fam_phases = {
         type: jsPsychHtmlKeyboardResponse,
         stimulus:  fam_stimulus,
         choices: "NO_KEYS",
         trial_duration: exposure_length,
         extensions: [
           {
             type: jsPsychExtensionWebgazer, 
             params: {targets: ['#jspsych-html-keyboard-response-stimulus']}
           }
         ],
         data: {   
             trial_type: "familiarization",
             complexity: novel_stimulus.includes("complexity") ? "complex" : "simple",
             exposure_time: exposure_length
         }
      }
     // get the interval 
     var fixation = {
         type: jsPsychHtmlKeyboardResponse,
         stimulus:  '<p style="font-size:32px;"><b> + </b></p>',
         choices: "NO_KEYS",
         trial_duration: interval_length,
     }
 
     // get the comparison trial
 
     // shuffle the left and right 
     stimuli_pair = [novel_stimulus, fam_stimulus]
     shuffleArray(stimuli_pair)
     left_stimulus = stimuli_pair[0]
     right_stimulus = stimuli_pair[1]
 
 
 var paired_presentation = {
     type: jsPsychHtmlKeyboardResponse,
     // maybe a better way to do it is to display a white image in the middle to control for the distance??
     stimulus: 
         ' <div class="row">' + 
              '<div id="column_left">' + 
                     left_stimulus + 
             '</div>' +
             '<div class="column">' + 
                 '<img src="media/blank.png" width="300px">' + 
             '</div>'+
             '<div id="column_right">' + 
                     right_stimulus + 
             '</div>'+ 
          '</div>',
   
     choices: "NO_KEYS",
     trial_duration: 5000,
     data: {
         trial_type: "paired_presentation",
         left_stimulus: ((left_stimulus == novel_stimulus) ? 'novel' : "familiar"),
         right_stimulus: ((right_stimulus == novel_stimulus) ? 'novel' : "familiar"),
         complexity: novel_stimulus.includes("complex") ? "complex" : "simple",
         left_stimulus_raw: left_stimulus, 
         right_stimulus_raw: right_stimulus, 
         exposure_time: exposure_length
     },
     extensions: [
       {
         type: jsPsychExtensionWebgazer, 
         params: {targets: ['#column_left', '#column_right']}
       }
     ]
 }
 
     block = [buffer, fam_phases, fixation, paired_presentation]
     return(block)
 }