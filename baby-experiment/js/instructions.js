function instructions(timeline){


        var consent = {
            type: "instructions",
          pages: [  'CONSENT'
            ],
                data: {stimulus_type: 'consent'},
                show_clickable_nav: true}


        var video_setup = {
            type: "instructions",
            pages: [  'VIDEO SETUP'
                ],
                data: {stimulus_type: 'video-setup'},
                show_clickable_nav: true}



        var intro1 = {
            type: "instructions",
          pages: [  "<p> Many thanks again for your participation. :) </p> ",
                    "<p> <b> The experiment begins now! </b> </p> <br></br>",
            ],
                data: {stimulus_type: 'instructions'},
                show_clickable_nav: true}

                timeline.push(consent)


                timeline.push({
                  type: 'fullscreen',
                  fullscreen_mode: true
                })

                timeline.push(video_setup)

                timeline.push(intro1)



return timeline
}
