
var dbname = "pokebaby"
var colname = "study_4"
//var itname = "pkbb_4"




function setupGame(){
    console.log("setup game called")
    socket.on('onConnected', function(d){


        var preload = {
            type: jsPsychPreload,
            images: all_stimuli
          }
    
    
          var timeline = []
          timeline.push(preload)
    
          var prolific_code = "3D699F4F"
    
          var subject_id ='SS' + Date.now()
          var intFrameWidth = window.innerWidth;
          var intFrameHeight = window.innerHeight
    
    
          //general function for grabbing parameter from a URL
          function getParamFromURL( name ) {
            name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
            var regexS = "[\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( window.location.href );
            if( results == null )
              return "";
            else
              return results[1];
          }
    
          // get participant-specific url parameters from Prolific study link
          var prolific_pid = getParamFromURL('PROLIFIC_PID');
          var study_id = getParamFromURL('STUDY_ID');
          var session_id = getParamFromURL('SESSION_ID');
    
          //make sure that nobody can enter anything damaging
          prolific_pid.replace(/[^A-Za-z0-9_]/g, "");
          study_id.replace(/[^A-Za-z0-9_]/g, "");
          session_id.replace(/[^A-Za-z0-9_]/g, "");
    
          


    
          var jsPsych = initJsPsych({
            on_trial_finish: function(){
                jsPsych.data.addProperties({ 
                  subject: subject_id, 
                  prolific_id: prolific_pid,
                  study: study_id,
                  session: session_id,
                  window_width: intFrameWidth, 
                  window_height: intFrameHeight,
	          dbname:dbname, 
		  colname:colname
		});
  		
		d = jsPsych.data.get()
		d.dbname = dbname
		d.colname = colname
                socket.emit('currentData', d)
                  //saveData("test" + subject_id, jsPsych.data.get().csv());
            
        } 
          });
    
          var enter_fullscreen = {
            type: jsPsychFullscreen,
            fullscreen_mode: true
          }
    
          
          timeline.push(enter_fullscreen)
          timeline = timeline.concat(instruction)
          timeline = timeline.concat(all_blocks)
    
          var pre_rating_trial = {
            type:jsPsychInstructions,
            pages: ["<p>You are almost done with the study!</p>" + 
                    "<p>Now we will just ask you some questions about our animation.</p>"
            ],
            show_clickable_nav: true,
          
          }
    
         
    
          timeline = timeline.concat(demog)
    
          var thank_you = {
           type: jsPsychHtmlButtonResponse,
           stimulus: 
               "<p>Congratulations! You are all done! </p>" + 
               "Your survey code is<p><b>"+ prolific_code + 
                "</b></p><p>Please make sure you save this somewhere safe. You will need to enter this code into Prolific to be paid.</p>",
            choices: ['Got it']
        }
    
    
        var exit_fullscreen = {
          type: jsPsychFullscreen,
          fullscreen_mode: false,
          delay_after: 0
        }
    
        timeline.push(exit_fullscreen)
       
        timeline.push(thank_you)

        jsPsych.run(timeline);


    })
}
