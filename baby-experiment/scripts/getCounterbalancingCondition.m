% backgrond-deviant pairs
pairs = {{'images/stimuli/spore_stims/simple_01_A', 'images/stimuli/spore_stims/simple_02_A'}
        {'images/stimuli/spore_stims/simple_03_A', 'images/stimuli/spore_stims/simple_04_A'}
        {'images/stimuli/spore_stims/simple_05_A', 'images/stimuli/spore_stims/simple_06_A'}
        {'images/stimuli/spore_stims/simple_07_A', 'images/stimuli/spore_stims/simple_08_A'}
        {'images/stimuli/spore_stims/simple_09_A', 'images/stimuli/spore_stims/simple_10_A'}
        {'images/stimuli/spore_stims/simple_11_A', 'images/stimuli/spore_stims/simple_12_A'}}.';


% block pairs
block_pairs = {{'Std', 3}, {'Dev', 5}, {'Dev', 7}, {'Std', 7}, {'Std', 5}, {'Dev', 3}};

block_types = cell(6,18);
stims = cell(6,18);


numStimShifts = 3;
numOrderShifts = 6;

for y = 1:numStimShifts
    
    stims_pairs = circshift(pairs, 1);
    
    for x  = 1:numOrderShifts
        
        % block types (deviant or std, and fam length)
        block_types(:,(y-1)* numOrderShifts + x) = circshift(block_pairs, 1);
        stims(:,(y-1)* numOrderShifts + x) = stims_pairs;


    end
    
end
    

