function get_feedback(timeline){
  

  var outro = {
    type: "instructions",
    pages:["Thank you for participating in our game! Now we just have one last question for the parent!"],
    show_clickable_nav: true
  }


  var demog_education = {
    type: "demog-gender-and-education",
    button_label: "Done",
    questions: [
        {prompt: "What is the highest degree or the higest level of school your child's mother has completed?", name: "education", options: ["Some high school", "High school diploma", "Associate Degree/Technical certification", "Bachelor's Degree",  "Master's Degree", "Doctorate/Professional degree", "Other"], required: true}
    ]
}


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

   timeline.push(outro)
   timeline.push(demog_education)
   timeline.push(generic_outro)
   
   

return timeline 
}