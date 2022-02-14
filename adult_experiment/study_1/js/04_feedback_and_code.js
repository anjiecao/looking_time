function get_feedback_and_code(timeline){
    
   var feedback = {
     type: 'survey-text',
     questions: [
       {prompt: "One last thing! Did you encounter any issue with the experiment? Was the animation laggy? Any other comments you would like to share with us?", placeholder: "", required: true},
     ],
     data: {stimulus_type: 'feedback'},
   };
    
   var thank_you = {
       type: "instructions",
       pages: [
           "<p>Thank you so much for participating in our study! Pleas go to next page for your payment information. </p>"
       ],
       data: {stimulus_type: 'instructions'},
       show_clickable_nav: true
   }
   
   var survey_code_page = {
         type: "instructions",
         pages:[
             "Your survey code is<p><b>"+ prolific_code + "</b></p><p>Please make sure you save this somewhere safe. You will need to enter this code into Prolific to be paid.</p>"
         ],
         show_clickable_nav: false
    }

   timeline.push(feedback)
    timeline.push(thank_you)
    timeline.push(survey_code_page)

return timeline 
}