function get_familiarity_rating_for_block(block){


}

function get_complexity_rating_for_block(block_info){

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


  rating_for_block = []

  if(block_info.block_type == "background_block"){
    rating_stimulus = generate_html_string_for_rating_task(block_info.background_type, block_info.background_stimulus)
    var complexity_rating_trial = {
      type: jsPsychSurveyLikert,
      preamble: rating_stimulus,
      scale_width: '500px',
      questions: [
        {
          prompt: q_complexity, 
          labels: scale_complexity
        }
      ],
      data: {
          complexity_rating_type: "background", 
          complexity_reps: block_info.trial_number
      }
    }
    rating_for_block.push(complexity_rating_trial)
     
  }else{
    rating_background_stimulus = generate_html_string_for_rating_task(block_info.background_type, block_info.background_stimulus)
    rating_deviant_stimulus = generate_html_string_for_rating_task(block_info.deviant_type, block_info.deviant_stimulus)
    
    var complexity_rating_trial_background = {
      type: jsPsychSurveyLikert,
      preamble: rating_background_stimulus,
      scale_width: '500px',
      questions: [
        {
          prompt: q_complexity, 
          labels: scale_complexity
        }
      ],
      data: {
          complexity_rating_type: "background", 
          complexity_reps: (block_info.trial_number - 1)
      }
    }

    var complexity_rating_trial_deviant = {
      type: jsPsychSurveyLikert,
      preamble: rating_deviant_stimulus,
      scale_width: '500px',
      questions: [
        {
          prompt: q_complexity, 
          labels: scale_complexity
        }
      ],
      data: {
          complexity_rating_type: "deviant", 
          complexity_reps: 1
      }
    }
    
    rating_for_block.push(complexity_rating_trial_background)
    rating_for_block.push(complexity_rating_trial_deviant)
  }

  return (rating_for_block)

}

function get_complexity_raitng_for_all_blocks(all_blocks_info){
  all_complexity_ratins = []
  for (var i= 0; i < all_blocks_info.length; i++){
      rating_for_block = get_complexity_rating_for_block(all_blocks_info[i])
      all_complexity_ratins = all_complexity_ratins.concat(rating_for_block)
  }
  return (all_complexity_ratins)

}



function generate_html_string_for_rating_task(stimulus_type, stimulus_string){
   

  var top_position = 20
  var left_postion = 46
  
  
  if(stimulus_type.includes("pair")){
      s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
          transform: translate(-50%, -50%);left:' + (left_postion-3) + '%"></img>'+
          '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position  + '%;\
          transform: translate(-50%, -50%);left:' + (left_postion + 3) + '%">'
  }else{
      s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
      transform: translate(-50%, -50%);left:' + 46 + '%"></img>'
      


  }

  return(s)
}