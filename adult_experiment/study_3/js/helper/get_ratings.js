


function get_similarity_rating_for_all_blocks(all_blocks_info){

  
  all_similarity_ratings = []
  for (var i= 0; i < all_blocks_info.length; i++){
      rating_for_block = get_similarity_rating_for_block(all_blocks_info[i])
      if(rating_for_block){
        all_similarity_ratings = all_similarity_ratings.concat(rating_for_block)
      }
  }
  return (all_similarity_ratings)

}


function get_similarity_rating_for_block(block_info){
  var scale_similarity = [
    "Most Dissimilar",
    "Very Dissimilar",
    "Quite Dissimilar",
    "Neither Similar Nor Dissimilar",
    "Quite Similar",
    'Very Similar',
    'Most Similar',
  ];

  var q_similarity = "How similar are these animations?"

  if(block_info.block_type == "background_block"){
    return 
  }else{
    
  // shuffling whether background appears on the left or on the right 
   decisions = ["background_left", "background_right"]
   decision = getRandomSubarray(decisions, 1)[0]
   if(decision == "background_left"){
    s = generate_html_string_for_similarity_rating(block_info.background_type, block_info.deviant_type, block_info.background_stimulus, block_info.deviant_stimulus)
   }else{
    s = generate_html_string_for_similarity_rating( block_info.deviant_type,block_info.background_type,  block_info.deviant_stimulus,block_info.background_stimulus,)
   }

   var similarity_rating_trial = {
    type: jsPsychSurveyLikert,
    preamble: s,
    scale_width: '500px',
    questions: [
      {
        prompt: q_similarity, 
        labels: scale_similarity,
        required: true
      }
    ],
    data: {
        violation_type: block_info.violation_type, 
        trial_number: block_info.trial_number
    }
  }

  return (similarity_rating_trial)



  }




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
          labels: scale_complexity,
          required: true
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
          labels: scale_complexity,
          required: true
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
          labels: scale_complexity,
          required: true
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
  all_complexity_ratings = []
  for (var i= 0; i < all_blocks_info.length; i++){
      rating_for_block = get_complexity_rating_for_block(all_blocks_info[i])
      all_complexity_ratings = all_complexity_ratings.concat(rating_for_block)
  }
  return (all_complexity_ratings)

}




function generate_html_string_for_similarity_rating(stimulus_a_type, stimulus_b_type, stimulus_a_string, stimulus_b_string){
   

  
  var top_position = 20
  
  var left_central_postion = 30
  var right_central_position = 70

  var left_pair_left = left_central_postion - 5
  var left_pair_right = left_central_postion + 5
  var right_pair_left = right_central_position - 5
  var right_pair_right = right_central_position + 5

  

  if (stimulus_a_type.includes("pair")){
      s_a = '<img src="' + stimulus_a_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
          transform: translate(-50%, -50%);left:' + left_pair_left + '%"></img>'+
          '<img src="' + stimulus_a_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position  + '%;\
          transform: translate(-50%, -50%);left:' + left_pair_right + '%">'
  }else{
      s_a = '<img src="' + stimulus_a_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
      transform: translate(-50%, -50%);left:' + left_central_postion + '%"></img>'
  }

  if (stimulus_b_type.includes("pair")){
    s_b = '<img src="' + stimulus_b_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
    transform: translate(-50%, -50%);left:' + right_pair_left + '%"></img>'+
    '<img src="' + stimulus_b_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position  + '%;\
    transform: translate(-50%, -50%);left:' + right_pair_right + '%">'
  }else{
    s_b = '<img src="' + stimulus_b_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
    transform: translate(-50%, -50%);left:' + right_central_position + '%"></img>'
  }

  s = s_a + s_b



  return(s)
}


function generate_html_string_for_rating_task(stimulus_type, stimulus_string){
   

  var top_position = 20
  var left_postion = 46
  
  
  if(stimulus_type.includes("pair")){
      s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
          transform: translate(-50%, -50%);left:' + (left_postion-5) + '%"></img>'+
          '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position  + '%;\
          transform: translate(-50%, -50%);left:' + (left_postion + 5) + '%">'
  }else{
      s = '<img src="' + stimulus_string + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + top_position + '%;\
      transform: translate(-50%, -50%);left:' + 46 + '%"></img>'
      


  }

  return(s)
}