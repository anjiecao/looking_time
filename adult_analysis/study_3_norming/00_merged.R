library(here)
library(tidyverse)



RAW_DATA_DIRECTORY <- here("data/00_raw_data/")
MIN_ROW <- 100  #subject to change 
MERGED_DATA_PATH <- here("data/merged_data.csv")

merge_data <- function(raw_data_directory, 
                                      merged_data_path, 
                                      min_row){
  
  raw_files <- str_c(raw_data_directory, dir(here(raw_data_directory), "*.csv"))
  
  # count how many rows in each file 
  RAW_count <- map_df(raw_files, function(file) {
    d <- read_csv(file) %>% 
      count() %>% 
      mutate(
        file_name = file 
      )
  })   
  
  
  RAW_DATA <- map_df((RAW_count %>% filter(n > min_row))$file_name,
                     function(file){
                       d <- read_csv(file)
                     }) #%>% 
    #select(-prolific_id)
  
  
  write_csv(RAW_DATA, merged_data_path)
  
  
  
}


merge_data(RAW_DATA_DIRECTORY, MERGED_DATA_PATH, MIN_ROW)