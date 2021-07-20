function get_feedback(timeline){
    
   var feedback = {
     type: 'survey-text',
     questions: [
       {prompt: "You are all done! You did great! What do you think of our game?", placeholder: "", required: true},
     ],
     data: {stimulus_type: 'feedback'},
   };
    
   var thankyou = {
    type: 'instructions',
    pages: ["You are all done! Thank you so much!"],
    show_clickable_nav: true,
    show_page_number: true,
    post_trial_gap: 2000
  }
  

   timeline.push(feedback)
   timeline.push(thankyou)
   

return timeline 
}