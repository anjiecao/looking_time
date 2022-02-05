

source(here("helper/get_included_participants.R"))
library(googlesheets4)
library(here)
library(googlesheets4)
library(jsonlite)
library(tidyverse)
library(stringr)



included_participants_df <- get_included_participants()

RAW_DATA_DIRECTORY <- here("data/00_raw_data/")

MIN_ROW <- 5  #subject to change 
MERGED_DATA_PATH <- here("data/01_merged_data/merged_data.csv")

get_included_data <- function(raw_data_directory,
                              min_row, 
                              included_participants_df){
  
  raw_files <- str_c(RAW_DATA_DIRECTORY, dir(here(RAW_DATA_DIRECTORY), "*.csv"))
  
  # count how many rows in each file 
  RAW_count <- map_df(raw_files, function(file) {
    d <- read_csv(file) %>% 
      count() %>% 
      mutate(
        file_name = file 
      )
  })   
  
  
  RAW_DATA <- map_df((RAW_count %>% filter(n > MIN_ROW))$file_name,
                     function(file){
                       d <- read_csv(file)
                     }) 
  
  id_data <- RAW_DATA %>% 
    filter(trial_type == "demog-age") %>% 
    select(subject, responses) %>% 
    mutate(responses = map(responses, ~ fromJSON(.))) %>%
    unnest(responses) %>% 
    unnest(responses)
  
  include_sbj <- included_participants_df %>% 
    select(`RedCAP ID`) %>% 
    pull()
  
  include_sbj_id <- id_data %>% 
    filter(responses %in% include_sbj) %>% 
    select(subject) %>% 
    pull()
  
  FILTERED_RAW_DATA <- RAW_DATA %>% 
    filter(subject %in% include_sbj_id)
  
  
  return(FILTERED_RAW_DATA)
  
}

included_merged_df <- get_included_data(RAW_DATA_DIRECTORY, MIN_ROW, included_participants_df)

write_csv(included_merged_df, here("data/01_merged_data/merged_data.csv"))
