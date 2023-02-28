


function get_all_complexity_rating(all_stimuli_info){


  var scale_complexity = [
    "Simplest",
    "Very Simple",
    "Quite Simple",
    "Neither Simple Nor Complex",
    "Quite Complex",
    'Very Complex',
    'Most Complex',
  ]

  var q_complexity = "How complex is this animation?"
  all_complexity_ratings = []

  for (var i = 0; i < all_stimuli_info.length; i++){

    rating_stimulus = generate_html_string(all_stimuli_info[i])

    var complexity_rating_trial = {
      type: jsPsychSurveyLikert,
      preamble: rating_stimulus,
      scale_width: '500px',
      questions: [
        {
          prompt: q_complexity, 
          labels: scale_complexity,
          required: true
        }
      ],
      data: {
          rating_type: "complexity",
          rating_stimulus: all_stimuli_info[i].stimulus, 
          rating_animacy: all_stimuli_info[i].animacy, 
          rating_number: all_stimuli_info[i].number, 
          rating_pose: all_stimuli_info[i].pose
      }
    }

    all_complexity_ratings.push(complexity_rating_trial)

  }

  return(all_complexity_ratings)
  
}

function generate_html_string(stimulus_info){

  var top_position = 20
  var left_postion = 46
  var pair_half_distance = 3.5

  stimulus_string = stimulus_info.stimulus
  
  if(stimulus_info.number == "pair"){
      s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
          transform: translate(-50%, -50%);left:' + (left_postion-pair_half_distance) + '%"></img>'+
          '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position  + '%;\
          transform: translate(-50%, -50%);left:' + (left_postion + pair_half_distance) + '%">'
  }else{
      s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
      transform: translate(-50%, -50%);left:' + left_postion + '%"></img>'
  }
  return (s)

}



