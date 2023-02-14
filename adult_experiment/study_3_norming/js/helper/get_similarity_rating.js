



function generate_stimilarity_rating_trial(target_stimulus, comparison_stimulus_a, comparison_stimulus_b){



    var target_top_position = 20
    var target_left_postion = 48



    var choice_top_position = 35 
    var left_central_postion = target_left_postion - 10
    var right_central_position = target_left_postion + 10


    s_target = '<img src="' + target_stimulus.stimulus + '" class="coveredImage test" style = "width:100px; height:100px; position:fixed; top:' + target_top_position + '%;\
    transform: translate(-50%, -50%);left:' + target_left_postion + '%"></img>'

    s_choice_left = '<img src="' + comparison_stimulus_a.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
    transform: translate(-50%, -50%);left:' + left_central_postion + '%"></img>'

    s_choice_right = '<img src="' + comparison_stimulus_b.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
    transform: translate(-50%, -50%);left:' + right_central_position + '%"></img>'


    var trial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: s_target,
        choices: ['left', 'right'],
        button_html: [
            '<img src="' + comparison_stimulus_a.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
            transform: translate(-50%, -50%);left:' + left_central_postion + '%"></img>', 
            '<img src="' + comparison_stimulus_b.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
            transform: translate(-50%, -50%);left:' + right_central_position + '%"></img>'        

        ],
        prompt: "<p>Click on the animation in the bottom row that is more similar to the top animation</p>"
      };

      return (trial)

}



function generate_html_string_for_similarity_rating(target_stimulus, comparison_stimulus_a, comparison_stimulus_b){
   

  
    var target_top_position = 5
    var target_left_postion = 46



    var choice_top_position = 20 
    var left_central_postion = 30
    var right_central_position = 70
  



    var left_pair_left = left_central_postion - 5
    var left_pair_right = left_central_postion + 5
    var right_pair_left = right_central_position - 5
    var right_pair_right = right_central_position + 5
  
    


    s_target = '<img src="' + target_stimulus.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + target_top_position + '%;\
    transform: translate(-50%, -50%);left:' + target_left_postion + '%"></img>'

    s_choice_left = '<img src="' + comparison_stimulus_a.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
    transform: translate(-50%, -50%);left:' + left_central_postion + '%"></img>'

    s_choice_right = '<img src="' + comparison_stimulus_b.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
    transform: translate(-50%, -50%);left:' + right_central_position + '%"></img>'


    s = s_target + s_choice_left + s_choice_right
  
  
    return(s)
  }
  