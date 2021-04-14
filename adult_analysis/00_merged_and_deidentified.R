library(here)
library(tidyverse)
# currently not deidentifiying!! 

RAW_DATA_DIRECTORY <- here("data/raw_data/")
#RAW_DATA_DIRECTORY <- here("data/raw_data/03_pilot/")

MIN_ROW <- 120  #subject to change 
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
