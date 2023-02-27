
function generate_target_set(all_stimuli_info){
    // all individual but each with random pose and number 
    target_set = []

    pose = ["left", "right"]
    number = ["pair", "single"]

    for (var i = 1; i < (all_stimuli_info.length / 8) + 1; i++){

        animate_pose = getRandomSubarray(pose, 1)[0]
        inanimate_pose = getRandomSubarray(pose, 1)[0]

        animate_number = getRandomSubarray(number, 1)[0]
        inanimate_number = getRandomSubarray(number, 1)[0]

        animate_with_index = all_stimuli_info.filter(obj => obj.index == i && obj.animacy === 'animate' && obj.pose == animate_pose && obj.number == animate_number)[0]
        inanimate_with_index =  all_stimuli_info.filter(obj => obj.index == i && obj.animacy === 'inanimate' && obj.pose == inanimate_pose && obj.number == inanimate_number)[0]

        target_set.push(animate_with_index)
        target_set.push(inanimate_with_index)

    }

    return target_set

}

function generate_pose_violaion(target, all_stimuli_info){

    pv_choice = all_stimuli_info.filter(obj => obj.index == target.index && obj.animacy === target.animacy && obj.pose != target.pose && obj.number == target.number)
    
    return pv_choice
}

function generate_animacy_violation(target, all_stimuli_info){

    av_choice = all_stimuli_info.filter(obj => obj.animacy != target.animacy && obj.pose === target.pose && obj.number === target.number)
    
    return av_choice

}

function generate_number_violation(target, all_stimuli_info){

    nv_choice = all_stimuli_info.filter(obj => obj.index == target.index && obj.animacy === target.animacy && obj.pose === target.pose && obj.number != target.number)

    return nv_choice

}

function generate_identity_violation(target, all_stimuli_info){
    iv_choice = all_stimuli_info.filter(obj => obj.index != target.index && obj.animacy === target.animacy && obj.pose === target.pose && obj.number === target.number)
    return iv_choice
}



function get_combination_of_violation(target, v1, v2){

    combo = []
    for (var i = 0; i < v1.length; i++){
        for (var j = 0; j < v2.length; j++){

            // shuffle the order
            v = [v1[i], v2[j]]
            shuffleArray(v)

            res = {
                target: target,
                choice_1: v[0], 
                choice_2: v[1]}

            combo.push(res)

        }
    }

    return (combo)


}




function generate_all_similarity_rating_package(target_set, all_stimuli_info, sample_n = 24){


    // get target, needs to be randomly selected from pose, number 

    // get an index array 
    index = Array.from({length: target_set.length}, (x, i) => i);


    // get pose violation 


    all_pose_violation = structuredClone(target_set.map(x => generate_pose_violaion(x, all_stimuli_info)))
    all_pose_violation = all_pose_violation.map(pvs => pvs.map(pv_obj => {pv_obj.violation = "pose" 
                                                             return pv_obj}))


    all_animacy_violation = structuredClone(target_set.map(x => generate_animacy_violation(x, all_stimuli_info)))
    all_animacy_violation = all_animacy_violation.map(avs => avs.map(av_obj => {av_obj.violation = "animacy" 
                                                                return av_obj}))

    all_number_violation = structuredClone(target_set.map(x => generate_number_violation(x, all_stimuli_info)))
    all_number_violation = all_number_violation.map(nvs => nvs.map(nv_obj => {nv_obj.violation = "number"
                                                                            return nv_obj}))

    all_identity_violation = structuredClone(target_set.map(x => generate_identity_violation(x, all_stimuli_info)))
    all_identity_violation = all_identity_violation.map(ivs => ivs.map(iv_obj => {iv_obj.violation = "identity" 
                                                                    return iv_obj}))


    // 24 * 1 * 12 
    pose_vs_animacy = getRandomSubarray(index.map(i => get_combination_of_violation(target_set[i], all_pose_violation[i], all_animacy_violation[i])).flat(), 
                                        sample_n)
    // 24 * 1 * 1 
    pose_vs_number = getRandomSubarray(index.map(i => get_combination_of_violation(target_set[i], all_pose_violation[i], all_number_violation[i])).flat(), 
                                        sample_n)
    // 24 * 1 * 11
    pose_vs_identity = getRandomSubarray(index.map(i => get_combination_of_violation(target_set[i], all_pose_violation[i], all_identity_violation[i])).flat(), 
                        sample_n)
    // 24 * 12 * 1
    animacy_vs_number = getRandomSubarray(index.map(i => get_combination_of_violation(target_set[i], all_animacy_violation[i], all_number_violation[i])).flat(), 
                        sample_n)
    // 24 * 12 * 11
    animacy_vs_identity = getRandomSubarray(index.map(i => get_combination_of_violation(target_set[i], all_animacy_violation[i], all_identity_violation[i])).flat(), 
                        sample_n)
    // 24 * 1 * 11
    number_vs_identity = getRandomSubarray(index.map(i => get_combination_of_violation(target_set[i], all_number_violation[i], all_identity_violation[i])).flat(), 
                        sample_n)


    all_pairing = [pose_vs_animacy, pose_vs_number, pose_vs_identity, animacy_vs_number, animacy_vs_identity, number_vs_identity].flat()


    return all_pairing

}













function generate_similarity_rating_blocks(all_similarity_rating_package){

    var pose_violation_package = all_similarity_rating_package.pose
    var pose_violation_block = pose_violation_package.map(triad => generate_stimilarity_rating_trial(triad, "pose"))
    shuffleArray(pose_violation_block)

    var number_violation_package = all_similarity_rating_package.number
    var number_violation_block = number_violation_package.map(triad => generate_stimilarity_rating_trial(triad, "number"))
    shuffleArray(number_violation_block)

    return(pose_violation_block)

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

/* 
[A, B, C, D, E]

[A, A, B]
[A, A, C]
[A, A, D]
[A, A, E]

[B, B, C]
[B, B, D]
[B, B, E]

[C, C, D]
[C, C, E]

[D, D, E]

***********

[A, B, C, D, E]

[A, B, C]
[A, B, D]
[A, B, E]
[A, C, D]
[A, C, E]
[A, D, E]

[B, C, D]x
[B, C, E]

[B, D, E]

[C, D, E]


*/

function get_identity_violation_triads(all_stimuli_info){

    total_index = (all_stimuli_info.length)/8
    all_number_violation = []

    all_animate =  all_stimuli_info.filter(obj => obj.animacy === 'animate');
    all_inanimate = all_stimuli_info.filter(obj => obj.animacy === 'inanimate');

    shuffleArray(all_animate)
    shuffleArray(all_inanimate)

    for (var target_i = 0; target_i < total_index + 1; target_i++){



    }



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

    key_left_image = "media/f.png"
    key_right_image = "media/j.png"


    var target_top_position = 10
    var target_left_postion = 48
    var choice_top_position = 25 
    var left_central_postion = target_left_postion - 10
    var right_central_position = target_left_postion + 10


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

    key_left = '<img src="' + key_left_image + '"style = "width:30px x; height:30px;position:fixed; top:' + (choice_top_position + 18) + '%;\
    transform: translate(-50%, -50%);left:' + (left_central_postion + 2) + '%"></img>'

    key_right = '<img src="' + key_right_image + '"style = "width:30px; height:30px;position:fixed; top:' + (choice_top_position + 18) + '%;\
    transform: translate(-50%, -50%);left:' + (right_central_position + 2) + '%"></img>'

    var trial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: s_target + s_choice_left + s_choice_right + key_left + key_right,
        choices: ['f', 'j'],
        prompt: "<p>Press the key under the animation in the bottom row that is more similar to the top animation</p>",
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
  