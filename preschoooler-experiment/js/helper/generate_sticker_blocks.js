function get_initial_sticker_html_array(n_sticker){

    STICKER_DIR = "images/stickers/"
    STICKER_ARRAY = []

    for (var i = 0; i < n_sticker; i++){
      sticker_path = STICKER_DIR + (i+1) + ".png"
      sticker_html_str = "<img src =" + sticker_path + " width ='300' height = '300' style = 'opacity:0;'>"
      STICKER_ARRAY.push(sticker_html_str)
    }

    return (STICKER_ARRAY)



  }

function get_final_sticker_html_array(n_sticker){

    STICKER_DIR = "images/stickers/"
    STICKER_ARRAY = []

    for (var i = 0; i < n_sticker; i++){
      sticker_path = STICKER_DIR + (i+1) + ".png"
      sticker_html_str = "<img src =" + sticker_path + " width ='300' height = '300' style = 'opacity:1;'>"
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
          type: 'instructions',
          pages: [
            block_html_string.join("")
          ],
          show_clickable_nav: true
      


        }

        FINAL_STICKER_BLOCKS.push(sticker_block)

        }
       
        
        return FINAL_STICKER_BLOCKS



}


