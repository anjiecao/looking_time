function get_initial_sticker_html_array(n_sticker){

    STICKER_DIR = "images/stickers/"
    STICKER_ARRAY = []

    for (var i = 0; i < n_sticker; i++){
      sticker_path = STICKER_DIR + (i+1) + ".png"
      sticker_html_str = "<img src =" + sticker_path + " style = 'opacity:0;'>"
      STICKER_ARRAY.push(sticker_html_str)
    }

    return (STICKER_ARRAY)



  }

function get_final_sticker_html_array(n_sticker){

    STICKER_DIR = "images/stickers/"
    STICKER_ARRAY = []

    for (var i = 0; i < n_sticker; i++){
      sticker_path = STICKER_DIR + (i+1) + ".png"
      sticker_html_str = "<img src =" + sticker_path + " style = 'opacity:1;'>"
      STICKER_ARRAY.push(sticker_html_str)
    }

    return (STICKER_ARRAY)



  }


function get_all_stickers_blocks_array(initial_stickers_array, final_stickers_array){

    FINAL_STICKER_BLOCKS = []
    total_block_nums = initial_stickers_array.length

    for (var i = 0; i < total_block_nums; i++){
        // replace the old string with new string 
        block_html_string = initial_stickers_array
        for (var j = 0; j < i+1; j++){
            block_html_string[j] = final_stickers_array[j]
        }


        sticker_block = {

            type: 'stimuli-presentation',
            frame_animation: function(){
  
  
              var html = ""
  
              return html
            },
              //position:absolute;top:28px;left:40px
                stimuli_animation: block_html_string.join(""),
                two_stimuli_interval: 0,
                key_response: [32],
                minimum_viewing_duration: 500, // daffner2000's info was 600, changed to 200
                response_ends_trial: true,
                exposure_type: "self_paced"
  
  
        }

        FINAL_STICKER_BLOCKS.push(sticker_block)

        }
       
        
        return FINAL_STICKER_BLOCKS



}


