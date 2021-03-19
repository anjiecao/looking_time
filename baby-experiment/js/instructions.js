function instructions(timeline){

  timeline.push({
    type: 'fullscreen',
    fullscreen_mode: true
  });

  var audio_check = {
        type: "audio-keyboard-response",
        stimulus: 'stimuli/audio/music_intro.wav',
        prompt: 'Can you hear this?',
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
 pages: ["<p> <b> The experiment begins now! </b> </p> <br></br>",
     ],
         show_clickable_nav: true}


         timeline.push(ready)

return timeline
}
