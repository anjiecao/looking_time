function get_feedback(timeline){
    
   var feedback = {
     type: 'survey-text',
     questions: [
       {prompt: "You are all done! You did great! What do you think of our game?", placeholder: "", required: true},
     ],
     data: {stimulus_type: 'feedback'},
   };
    
  

   timeline.push(feedback)
   

return timeline 
}