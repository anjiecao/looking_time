library(here)
library(tidyverse)
# currently not deidentifiying!! 

#RAW_DATA_DIRECTORY <- here("data/platform_comparison_data/mTurk/raw_data/")
#MERGED_DATA_PATH <- here("data/platform_comparison_data/mTurk/merged_data/mTurk_merged_data.csv")

#RAW_DATA_DIRECTORY <- here("data/platform_comparison_data/prolific/raw_data/")
#MERGED_DATA_PATH <- here("data/platform_comparison_data/prolific/merged_data/merged_data.csv")


RAW_DATA_DIRECTORY <- here("data/00_raw_data/")

MIN_ROW <- 50  #subject to change 
MERGED_DATA_PATH <- here("data/01_merged_data/merged_data.csv")

merge_and_deidentify_data <- function(raw_data_directory, 
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
                     })
  
  
  write_csv(RAW_DATA, merged_data_path)
  
  
  
}


merge_and_deidentify_data(RAW_DATA_DIRECTORY, MERGED_DATA_PATH, MIN_ROW)