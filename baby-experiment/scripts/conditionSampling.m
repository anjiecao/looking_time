function currentCondition = conditionSampling(varargin)

% samples condition
% if input is 1, then it restores the possible conditions to the whole set
% and ends the function

if isempty(varargin)
    0;
elseif varargin{1} == 1
    possibleConditions = 1:6; % iall conditions are possible
    save('possibleConditions.mat', 'possibleConditions')
    return
end
createCounter = 0;

try
    possibleConditions = importdata('possibleConditions.mat');
catch
    possibleConditions = 1:6; % iall conditions are possible
end

randomIdx = randi(length(possibleConditions), 1);

currentCondition = possibleConditions(randomIdx);

sprintf('current condition: %i', currentCondition)

possibleConditions(randomIdx) = [];

if isempty(possibleConditions)
    possibleConditions = 1:6;
end

save('possibleConditions.mat', 'possibleConditions')