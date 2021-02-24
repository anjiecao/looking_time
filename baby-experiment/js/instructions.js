function instructions(timeline){



for (i = 2; i <= 11; i ++){
  var intro = {
      type: "html-keyboard-response",
      stimulus: "<p><img src=stimuli/intro/intro" + i + ".jpeg width ='900' height = '500'></p>"
  }

     timeline.push(intro)

   }


return timeline
}
