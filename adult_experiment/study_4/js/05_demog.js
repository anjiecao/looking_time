function get_demog_questions(timeline){
    

    var pre_demog_instruction = {
          type: jsPsychHtmlButtonResponse,
          stimulus: 
              "<p>Congratulations! You have finished all the tasks tasks!</p>" + 
              "<p>Now, we would like to ask a few questions about you.</p>",
          choices: ['Got it']
      }
  
  
    var demog_question_age = {
        type: jsPsychSurveyText,
        questions: [
          {prompt: 'How old are you?'}
        ]
    }

  
       var demog_question_ethnicity = {
          type: jsPsychSurveyMultiSelect,
          button_label: "Done",
          questions: [
              {prompt: "What is your racial or ethnic identification? Check all that apply.", 
              name: "ethnicity", 
              options:  ["American Indian or Alaska Native", 
              "Asian", "Black or African American", 
              "Hispanic or Latino", 
              "Native Hawaiian or Other Pacific Islander", 
              "White", "Other"], required: true}
          ]
      }

      var demog_gender = {
        type: jsPsychSurveyText,
        questions: [
          {prompt: 'What is your gender?'}
        ]
     }
  
      var demog_education = {
          type: jsPsychSurveyMultiChoice,
          button_label: "Done",
          questions: [
              {prompt: "What is the highest degree or the higest level of school you have completed? If you are currently enrolled as a student, then please select the highest degree or education you have received.", name: "education", options: ["Some high school", "High school diploma", "Associate Degree/Technical certification", "Bachelor's Degree",  "Master's Degree", "Doctorate/Professional degree", "Other"], required: true}
          ]
      }

     lagginess_q =  "Last question: We are interested in your experinece with our experiment. Did you experience any loading issues with our stimuli?"
     lagginess_a = ["Many animals did not load",  "Some animals loaded more slowly than others", "No apparent issues"]
     
     var lagginess_survey = {
        type: jsPsychSurveyMultiChoice,
        button_label: "Done",
        questions: [
            {prompt: lagginess_q, name: "experience", options:lagginess_a, required: true}
        ]
    }
    
    timeline.push(pre_demog_instruction)
    timeline.push(demog_question_age)
    timeline.push(demog_question_ethnicity)
    timeline.push(demog_gender)
    timeline.push(demog_education)
    timeline.push(lagginess_survey)
  
    return timeline 
  }
  