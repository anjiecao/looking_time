function instructions(timeline){

  timeline.push({
    type: 'fullscreen',
    fullscreen_mode: true
  });

  var audio_check = {
        type: "audio-keyboard-response",
        stimulus: 'stimuli/audio/music_intro.wav',
        prompt: "<p><span style=\"font-family: arial, helvetica, sans-serif; font-size: 48px; color: #993300;\"> Can you hear this? </span></p>",
        choices: jsPsych.ALL_KEYS
      }

  timeline.push(audio_check);


for (i = 2; i <= 9; i ++){
  var intro = {
      type: "html-keyboard-response",
      stimulus: "<p><img src=stimuli/intro/intro" + i + ".jpeg width ='900' height = '500'></p>"
  }

     timeline.push(intro)

   }

 var ready = {
     type: "instructions",
 pages: ["<p><span style=\"font-family: arial, helvetica, sans-serif; font-size: 48px; color: #993300;\"> We are ready to go! </span></p>",
     ],
         show_clickable_nav: true}


         timeline.push(ready)

return timeline
}
