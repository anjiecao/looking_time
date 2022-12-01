function get_paired_preference_rating(stimuli_pair){

    shuffleArray(stimuli_pair)
    left_stimulus = stimuli_pair[0]
    right_stimulus = stimuli_pair[1]

    //https://www.frontiersin.org/articles/10.3389/fpsyg.2011.00043/full
    likert_scale = [
        "Strongly prefer <br>the creature on the <b>left</b>", 
        "Prefer <br>the creature on the <b>left</b>", 
        "No preference <br>for either creature", 
        "Prefer <br>the creature on the <b>right</b>", 
        "Strongly prefer <br>the creature on the <b>right</b>"
      ]
      
      var trial = {
        type: jsPsychSurveyLikert,
        questions: [
          {prompt: 
            ' <div class="row">' + 
                 '<div id="column_left">' + 
                 left_stimulus + 
                    //'<img src="' + left_stimulus + ' style="width:300px">'+ 
                '</div>' +
                '<div class="column">' + 
                    '<img src="media/blank.png" width="300px">' + 
                '</div>'+
                '<div id="column_right">' + 
                right_stimulus + 
                    //'<img src="' + right_stimulus + 'width="300px">'+ 
                '</div>'+ 
             '</div>'
            
            
            , name: 'ratings', labels: likert_scale, required: true},
         
        ],
        data: {
          trial_type: "ratings",
          left_stimulus_raw: left_stimulus, 
          right_stimulus_raw: right_stimulus
      }


      };

    return (trial)

}