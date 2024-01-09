
function check_violation_type(all_blocks_info){

    background_counter = 0
    deviant_counter = 0
    // check there are eight blocks 
    all_blocks_info.forEach((block) => {

    

        if (block.block_type == "deviant_block"){
            deviant_counter = deviant_counter + 1

            //get all the information
            block_background_animacy = block.background_stimulus.includes("inanimate") ? "inanimate" : "animate"
            block_background_id = block.background_stimulus.match(/\d+/g)[0];
            block_background_pose = block.background_stimulus.includes("left") ? "left" : "right"

            block_deviant_animacy = block.deviant_stimulus.includes("inanimate") ? "inanimate" : "animate"
            block_deviant_id =  block.deviant_stimulus.match(/\d+/g)[0]
            block_deviant_pose = block.deviant_stimulus.includes("left") ? "left" : "right"

            
            // check violation type 
            if (block.violation_type == "identity"){
                // if identity, the difference should only be the number
                console.log(
                    "pass identity check:", 
                    (block_background_animacy == block_deviant_animacy) & (block_background_pose == block_deviant_pose) & (block_background_id != block_deviant_id)
                )
               
            }else if(block.violation_type == "animacy"){
                console.log(
                    "pass animacy check:", 
                    (block_background_animacy != block_deviant_animacy) & (block_background_pose == block_deviant_pose)
                )

            }else if(block.violation_type == "pose"){
                console.log(
                    "pass pose check:", 
                    (block_background_animacy == block_deviant_animacy)  & (block_background_pose != block_deviant_pose) & (block_background_id == block_deviant_id)
                )

            }else if(block.violation_type == "number"){
                console.log(
                    "pass number check:", 
                    (block_background_animacy == block_deviant_animacy)  & (block_background_pose == block_deviant_pose) & (block_background_id == block_deviant_id)
                )
            }



        }else{
            background_counter = background_counter + 1
        }

      

      
        
    });

    console.log("8 background blocks:", background_counter == 8)
    console.log("8 deviant blocks:", deviant_counter == 8 )


}

