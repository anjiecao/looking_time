function get_feedback(timeline){
  

  var generic_outro = {
    type: 'instructions',
    pages: [
        "<p><img src=images/outro/outro1.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/outro/outro2.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/outro/outro3.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/outro/outro4.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/outro/outro5.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/outro/outro6.jpeg width ='900' height = '500'></p>",


      
    ],
    show_clickable_nav: true



} 
  

   timeline.push(generic_outro)
   
   

return timeline 
}