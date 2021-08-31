function get_task_info(basic_block_information, stimuli_array, task_type){

    if (task_type == "math"){

        first_addend = Math.floor(Math.random() * 9) + 1;
        second_addend = Math.floor(Math.random() * 9) + 1;
        result = first_addend + second_addend;
        offset_array = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]
        shuffleArray(offset_array)

    // pop off to make sure offset2 is different from offset1
        offset1 = offset_array.pop()
        offset2 = offset_array.pop()
    
        var option1 = parseFloat(result) + parseFloat(offset1)
        var option2 = parseFloat(result) + parseFloat(offset2)
        
        options = [result, option1, option2]
        shuffleArray(options)

        task_type_object = {
            task_type: "math",
            first_addend: first_addend,
            second_addend: second_addend,
            result: result,
            options: options
        }

    }else{

        
        var novel_item = stimuli_array[Math.floor(Math.random() * stimuli_array.length)];
        var speciesInfo = novel_item.slice(novel_item.length-10, novel_item.length-8)
        var stimuli_array =  stimuli_array.filter(x => !(x.includes(speciesInfo)))
  // and get info about species, modification, movement/rotation
        
        var presenting_item_pool = [
            novel_item, 
            basic_block_information.background_stimuli
        ]
        if(num_deviants[0] != 0){
            presenting_item_pool.push(basic_block_information.background_stimuli)
        }
        
        task_type_object = {
            task_type: task_type, 
            presenting_item: presenting_item_pool[Math.floor(Math.random() * presenting_item_pool.length)]
        }

    
    }
    

    full_block_information = basic_block_information
    full_block_information.task_information = task_type_object

    return ([stimuli_array, full_block_information])


}