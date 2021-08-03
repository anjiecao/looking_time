function get_consent_and_demog(timeline){

    var consent = {
        type: 'instructions',
        pages: ["<div id='consent' style='font-size: 15px; line-height: normal; text-align: left; padding: 40px'><h1>Parent Consent for Online Testing</h1>" +
        "<p>DESCRIPTION: Our studies are designed to be fun, age-appropriate activities for young children, and easily conducted " +
        "online through a web browser or through tablet-based apps with parental guidance. Your child will be asked to play one or " +
        "more short research games. In these games, your child will be introduced to storybooks, pictures, animations, or pre-recorded " +
        "video clips; in some studies we may present toys and puppets. Afterwards we will ask short questions. Thereare no right or " +
        "wrong answers; we are just interested in what children think.</p>" +
        "<p>RISKS AND BENEFITS: Participation in our research has no foreseeable risks or discomforts to you or your child. If your " +
        "child wants to stop participating for any reason, you can end the session immediately with no penalty. We cannot and do not " +
        "guarantee that you will receive any benefits from participation, apart from the satisfaction of contributing to scientific " +
        "research.</p>" +
        "<p>PAYMENTS: You will not receive a cash payment for your participation in this research.</p>" +
        "<p>TIME: Each session typically lasts no more than 15 minutes, depending on the nature of the study.  Most studies involve a " +
        "single session, but in some cases you and your child will be invited to participate in more than one session.</p>" +
        "<p>CONTACT INFORMATION: If you have any questions, concerns, or complaints about this research study, its procedures, risks, " +
        "and benefits, contact the Protocol Director, Dr. Michael C. Frank. Email: <a href='mailto:langcoglab@stanford.edu'>" +
        "langcoglab@stanford.edu</a>, Phone: (650) 721-9270. <br />" +
        "Independent Contact: If you have any concerns, complaints, or general questions about your rights as a participant, please " +
        "contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team. Phone: " +
        "(650) 723-2480, or toll free at 1-866-680-2906.  Mail: Stanford IRB, 1705 El Camino Real, Stanford University, Stanford, " +
        "CA 94305-5401.</p>" +
        "<p>PARTICIPANT'S RIGHTS: Your child's participation is voluntary and your child has the right to withdraw his/her consent or " +
        "discontinue participation at any time without any negative consequences.</p>" +
        "<p><input type='checkbox' id='consent_checkbox' />  I give consent for my child to participate in this study. I understand that " +
        "I or my child may stop participation at any time.</p>" +
        "</div>", 
        "Before the experiment starts, we will ask a few questions about your child."],

        show_clickable_nav: true,
        show_page_number: true,
        post_trial_gap: 2000
    }
  

  var demog_question_age = {
        type: 'demog-age',
        questions: [
        {prompt: "How old is your child?", name: "age", required: true}
        ],
    }

     var demog_question_ethnicity = {
        type: "demog-ethnic-US",
        button_label: "Done",
        questions: [
            {prompt: "What is your child's racial or ethnic identification? Check all that apply.", name: "ethnicity", options:  ["American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic or Latino", "Native Hawaiian or Other Pacific Islander", "White", "Other"], required: true}
        ]
    }

    var demog_gender_and_education = {
        type: "demog-gender-and-education",
        button_label: "Done",
        questions: [
            {prompt: "What is your child's gender?", name: "gender", options: ["Female", "Male", "Non-binary", "Decline to Answer"], required: true},
            {prompt: "What is the highest degree or the higest level of school your child's mother has completed?", name: "education", options: ["Some high school", "High school diploma", "Associate Degree/Technical certification", "Bachelor's Degree",  "Master's Degree", "Doctorate/Professional degree", "Other"], required: true}
        ]
    }


    
var generic_intro = {
    type: 'instructions',
    pages: [
        "<p><img src=images/intro/intro2.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro3.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro4.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro5.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro6.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro7.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro8.jpeg width ='900' height = '500'></p>",
    ],
    show_clickable_nav: true



} 
    


timeline.push(consent)
timeline.push(demog_question_age)
timeline.push(demog_question_ethnicity)
timeline.push(demog_gender_and_education)
timeline.push(generic_intro)


return timeline 
}
