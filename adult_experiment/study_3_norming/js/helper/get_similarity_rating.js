

function generate_similarity_rating_blocks(all_similarity_rating_package){

    var pose_violation_package = all_similarity_rating_package.pose
    var pose_violation_block = pose_violation_package.map(triad => generate_stimilarity_rating_trial(triad, "pose"))
    
    var number_violation_package = all_similarity_rating_package.number
    var number_violation_block = number_violation_package.map(triad => generate_stimilarity_rating_trial(triad, "number"))

    return(number_violation_block)

}




function generate_similarity_rating_package(all_stimuli_info){

    all_similarity_rating_package = {
        pose: [], 
        number: [], 
        identity: [], 
        animacy: []
    }

    // pose 24  (diff num; diff pose; random number & pose) 
    // A, A, A with different pose 

    all_pose_violation = get_pose_violation_triads(all_stimuli_info)
    all_similarity_rating_package.pose = all_pose_violation
    // number comparison 24 (random pose & number at target )
    // B, B, B with different number 
    all_number_violation = get_number_violation_triads(all_stimuli_info)
    all_similarity_rating_package.number = all_number_violation

    // identity comparison 61 
    // C, C, with all the other in categories one 

    // animacy comparison 61 + 12
    // D, D, with all the other animacy comparison

    return (all_similarity_rating_package)

}


function get_number_violation_triads(all_stimuli_info){

    total_index = (all_stimuli_info.length)/8
    all_number_violation = []

    for (var i = 1; i < total_index + 1; i++){
        
        animate_with_index = all_stimuli_info.filter(obj => obj.index == i && obj.animacy === 'animate');
        inanimate_with_index = all_stimuli_info.filter(obj => obj.index == i && obj.animacy === 'inanimate');

        // select a random stimulus as the target 
        random_animate_stimulus = getRandomSubarray(animate_with_index, 1)[0]
        random_inanimate_stimulus = getRandomSubarray(inanimate_with_index, 1)[0]

        // select a random non-used stimulus with number violation as in-animate 
        random_animate_distractor = animate_with_index.filter(obj => obj.animacy == random_animate_stimulus.animacy && obj.number != random_animate_stimulus.number && obj.pose == random_animate_stimulus.pose)[0]
        random_inanimate_distractor = inanimate_with_index.filter(obj => obj.animacy == random_inanimate_stimulus.animacy && obj.number != random_inanimate_stimulus.number && obj.pose == random_inanimate_stimulus.pose)[0]
    

        // form triad, always put the duplicate first atm 
        animate_triad = [random_animate_stimulus, random_animate_stimulus,random_animate_distractor]
        inanimate_triad = [random_inanimate_stimulus, random_inanimate_stimulus, random_inanimate_distractor]

        all_number_violation.push(animate_triad)
        all_number_violation.push(inanimate_triad)

    }

    return (all_number_violation)

}


function get_pose_violation_triads(all_stimuli_info){

    total_index = (all_stimuli_info.length)/8
    all_pose_violation = []

    for (var i = 1; i < total_index + 1; i++){
        
        animate_with_index = all_stimuli_info.filter(obj => obj.index == i && obj.animacy === 'animate');
        inanimate_with_index = all_stimuli_info.filter(obj => obj.index == i && obj.animacy === 'inanimate');

        // select a random stimulus as the target 
        random_animate_stimulus = getRandomSubarray(animate_with_index, 1)[0]
        random_inanimate_stimulus = getRandomSubarray(inanimate_with_index, 1)[0]

        // select a random non-used stimulus with pose violation as in-animate 
        random_animate_distractor = animate_with_index.filter(obj => obj.animacy == random_animate_stimulus.animacy && obj.number == random_animate_stimulus.number && obj.pose != random_animate_stimulus.pose)[0]
        random_inanimate_distractor = inanimate_with_index.filter(obj => obj.animacy == random_inanimate_stimulus.animacy && obj.number == random_inanimate_stimulus.number && obj.pose != random_inanimate_stimulus.pose)[0]
    

        // form triad, always put the duplicate first atm 
        animate_triad = [random_animate_stimulus, random_animate_stimulus,random_animate_distractor]
        inanimate_triad = [random_inanimate_stimulus, random_inanimate_stimulus, random_inanimate_distractor]

        all_pose_violation.push(animate_triad)
        all_pose_violation.push(inanimate_triad)

    }
    return (all_pose_violation)

}



function generate_stimilarity_rating_trial(triad, comparison_type){


    console.log(triad)
    target_stimulus = triad[0]
    // remove the first element
    choice_stimuli = triad.slice(1)
    shuffleArray(choice_stimuli)
    comparison_stimulus_a = choice_stimuli[0]
    comparison_stimulus_b = choice_stimuli[1]


    var target_top_position = 20
    var target_left_postion = 48
    var choice_top_position = 35 
    var left_central_postion = target_left_postion - 20
    var right_central_position = target_left_postion + 20


    if(target_stimulus.number == "single"){
        s_target = '<img src="' + target_stimulus.stimulus + '" class="coveredImage test" style = "width:100px; height:100px; position:fixed; top:' + target_top_position + '%;\
    transform: translate(-50%, -50%);left:' + target_left_postion + '%"></img>'
    }else{
        s_target = '<img src="' + target_stimulus.stimulus + '" class="coveredImage test" style = "width:100px; height:100px; position:fixed; top:' + target_top_position + '%;\
    transform: translate(-50%, -50%);left:' + (target_left_postion -5) + '%"></img>' +  '<img src="' + target_stimulus.stimulus + '" class="coveredImage test" style = "width:100px; height:100px; position:fixed; top:' + target_top_position + '%;\
    transform: translate(-50%, -50%);left:' + (target_left_postion + 5) + '%"></img>'
    
    }

    
    if (comparison_stimulus_a.number == "single"){
        s_choice_left =  s_choice_left = '<img src="' + comparison_stimulus_a.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
        transform: translate(-50%, -50%);left:' + left_central_postion + '%"></img>'
    }else{
        console.log("PAIR??")
        s_choice_left = '<img src="' + comparison_stimulus_a.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
        transform: translate(-50%, -50%);left:' + (left_central_postion-5) + '%"></img>' + '<img src="' + comparison_stimulus_a.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
        transform: translate(-50%, -50%);left:' + (left_central_postion + 5) + '%"></img>'
        console.log(s_choice_left)
    }

    
    if (comparison_stimulus_b.number == "single"){
        s_choice_right = '<img src="' + comparison_stimulus_b.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
        transform: translate(-50%, -50%);left:' + right_central_position + '%"></img>'
    }else{
        s_choice_right = '<img src="' + comparison_stimulus_b.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
        transform: translate(-50%, -50%);left:' + (right_central_position-5) + '%"></img>' + '<img src="' + comparison_stimulus_b.stimulus + '" class="coveredImage test" style = "width:100px; height:100px;position:fixed; top:' + choice_top_position + '%;\
        transform: translate(-50%, -50%);left:' + (right_central_position+5) + '%"></img>'
    }

    var trial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: s_target,
        choices: ['left', 'right'],
        button_html: [
            s_choice_left,
            s_choice_right
        ],
        prompt: "<p>Click on the animation in the bottom row that is more similar to the top animation</p>",
        data: {
            target: target_stimulus.stimulus, 
            left: comparison_stimulus_a.stimulus, 
            right: comparison_stimulus_b.stimulus, 
            comparison_type: comparison_type
        }
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
  