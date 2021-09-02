function get_zoom_tutorial(timeline){

    
  
      
  var zoom_tutorial = {
      type: 'instructions',
      pages: [
          "<p><img src=images/intro/ss_zoom_1.jpg width ='900' height = '500'></p>",
          "<p><img src=images/intro/ss_zoom_2.jpg width ='900' height = '500'></p>",
          "<p><img src=images/intro/ss_zoom_3.jpg width ='900' height = '500'></p>",
          "<p><img src=images/intro/ss_zoom_4.jpg width ='900' height = '500'></p>"
         
      ],
      show_clickable_nav: true
  
  
  
  } 
      
  
  timeline.push(zoom_tutorial)

  return timeline 
  }
  