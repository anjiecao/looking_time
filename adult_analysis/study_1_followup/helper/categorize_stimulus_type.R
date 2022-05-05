categorize_stimulus_type <- function(stimulus, prolific_id, pairing_d){
  stimuli_info = pairing_d[pairing_d$prolific_id == prolific_id, ]
  if(grepl(stimulus, pairing_d$background_stimuli[[1]])){
    stimulus_type = "background"
  }else if (grepl(stimulus, pairing_d$deviant_stimuli[[1]])){
    stimulus_type = "deviant"
  }else{
    stimulus_type = "novel"
  }
  return(stimulus_type)
  
}