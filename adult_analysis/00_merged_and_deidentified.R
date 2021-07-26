library(here)
library(tidyverse)
# currently not deidentifiying!! 

#RAW_DATA_DIRECTORY <- here("data/platform_comparison_data/mTurk/raw_data/")
#MERGED_DATA_PATH <- here("data/platform_comparison_data/mTurk/merged_data/mTurk_merged_data.csv")

#RAW_DATA_DIRECTORY <- here("data/platform_comparison_data/prolific/raw_data/")
#MERGED_DATA_PATH <- here("data/platform_comparison_data/prolific/merged_data/merged_data.csv")


RAW_DATA_DIRECTORY <- here("data/raw_data/")

MIN_ROW <- 150  #subject to change 
MERGED_DATA_PATH <- here("data/merged_data/merged_data.csv")

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


write_csv(RAW_DATA, MERGED_DATA_PATH)
