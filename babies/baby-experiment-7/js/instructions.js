function instructions(timeline){

  timeline.push({
    type: 'fullscreen',
    fullscreen_mode: true
  });

  var demog = {
        type: 'survey-text',
        questions: [
        {prompt: "<p><span style=\"font-family: arial, helvetica, sans-serif; font-size: 24px; color: #000000;\"> Age in days </span></p>", name: "Age", required: true},
        {prompt: "<p><span style=\"font-family: arial, helvetica, sans-serif; font-size: 24px; color: #000000;\"> SEX (M/F) </span></p>", name: "Gender", required: true}
        ],
    }

timeline.push(demog)


  var audio_check = {
        type: "audio-keyboard-response",
        stimulus: 'stimuli/audio/music_intro.wav',
        prompt: "<p style=\"font-family: arial, helvetica, sans-serif; font-size: 48px; background-color: white;color: #993300; width: 1200px; padding-top: 319.01px; padding-bottom: 319.01px;\"> <span > Can you hear this? </span></p>",
        choices: jsPsych.ALL_KEYS
      }

  timeline.push(audio_check);


for (i = 2; i <= 8; i ++){

  // skip consent
  var intro = {
      type: "html-keyboard-response",
      stimulus: "<p><img src=stimuli/intro/intro" + i + ".jpeg width ='1200' height = '667'></p>",

  }

     timeline.push(intro)

   }

 var ready = {
     type: "instructions",
     pages: ["<p><span style=\"font-family: arial, helvetica, sans-serif; font-size: 48px; color: #993300; background-color: white; padding-right: 133.61px; padding-left: 133.61px; padding-top: 277.77px; padding-bottom: 297.77px; \"> We are ready to go! Let's get started with a calibration.</span></p>",
    ],
         show_clickable_nav: true}


timeline.push(ready)



var calibration = {
 type: 'video-keyboard-response',
 stimulus: [
     'stimuli/images/calibration.mp4'],
 autoplay: true,
 trial_ends_after_video: true,
 width: 1000,
 data: {stimulus_type: 'calibration'}
}

timeline.push(calibration)


return timeline
}
