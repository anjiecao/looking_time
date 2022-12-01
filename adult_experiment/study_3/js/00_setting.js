
INTERVAL_TIME = 1000
EXPOSURE_LENGTH = [500, 2000, 10000] // in ms 
COMPLEXITY_LEVEL = ["simple", "complex"]
BLOCK_NUM = EXPOSURE_LENGTH.length * COMPLEXITY_LEVEL.length * 2

// get all stimuli 
// the pool has 20 each level 
ALL_STIMULI = get_all_stimuli(COMPLEXITY_LEVEL)
ALL_FAM_NOVEL_PAIRS = get_fam_novel_pair(ALL_STIMULI, BLOCK_NUM, COMPLEXITY_LEVEL)

check_no_duplciate(ALL_FAM_NOVEL_PAIRS)





