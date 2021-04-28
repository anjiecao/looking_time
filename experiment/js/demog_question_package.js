function demog_question_package(timeline){

  var demog_question_age = {
        type: 'demog-age',
        questions: [
        {prompt: "How old are you?", name: "age", required: true}
        ],
    }

     var demog_question_ethnicity = {
        type: "demog-ethnic-US",
        button_label: "Done",
        questions: [
            {prompt: "What is your racial or ethnic identification? Check all that apply.", name: "ethnicity", options:  ["American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic or Latino", "Native Hawaiian or Other Pacific Islander", "White", "Other"], required: true}
        ]
    }

    var demog_gender_and_education = {
        type: "demog-gender-and-education",
        button_label: "Done",
        questions: [
            {prompt: "What is your gender?", name: "gender", options: ["Female", "Male", "Non-binary", "Decline to Answer"], required: true},
            {prompt: "What is the highest degree or the higest level of school you have completed? If you are currently enrolled as a student, then please select the highest degree or education you have received.", name: "education", options: ["Some high school", "High school diploma", "Associate Degree/Technical certification", "Bachelor's Degree",  "Master's Degree", "Doctorate/Professional degree", "Other"], required: true}
        ]
    }

timeline.push(demog_question_age)
timeline.push(demog_question_ethnicity)
timeline.push(demog_gender_and_education)


}
