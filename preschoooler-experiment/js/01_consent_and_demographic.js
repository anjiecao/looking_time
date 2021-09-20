function get_consent_and_demog(timeline){

    
  

  var demog_red_cap_ID = {
        type: 'demog-age',
        questions: [
        {prompt: "Please enter the RedCap ID below", name: "redcap_id", required: true}
        ],
    }

    var demog_subject_ID = {
        type: 'demog-age',
        questions: [
        {prompt: "Please enter the subject ID below", name: "redcap_id", required: true}
        ],
    }



    
var generic_intro = {
    type: 'instructions',
    pages: [
        "<p><img src=images/intro/intro2.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro3.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro4.jpeg width ='900' height = '500'></p>",
       // "<p><img src=images/intro/intro5.jpeg width ='900' height = '500'></p>",
       // "<p><img src=images/intro/intro6.jpeg width ='900' height = '500'></p>",
        //"<p><img src=images/intro/intro7.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro8.jpeg width ='900' height = '500'></p>",
        "<p><img src=images/intro/intro9.jpg width ='900' height = '500'></p>"

    ],
    show_clickable_nav: true



} 
    

timeline.push(generic_intro)
timeline.push(demog_subject_ID)
timeline.push(demog_red_cap_ID)



return timeline 
}
