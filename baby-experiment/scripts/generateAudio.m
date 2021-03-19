%% intro clip
[x, Fs] = audioread('/Users/galraz1/Developer/looking_time/baby-experiment/stimuli/audio/music_1m.wav');

audiowrite('/Users/galraz1/Developer/looking_time/baby-experiment/stimuli/audio/music_intro.wav', x/15, Fs);


%% fam clips
[x, Fs] = audioread('/Users/galraz1/Developer/looking_time/baby-experiment/stimuli/audio/full_song.mp3');

% number of chunks
numChunks = 10;

% get 10 chunks of 6 sec snippets
snippetLength = Fs*6;

% start points and end points
startPoints = randi(length(x), [1 numChunks]);
endPoints = startPoints + snippetLength;

% collect clips
for i = 1:numChunks
    current_clip = x(startPoints(i):endPoints(i));
    
    % break chunk into 5 equal pieces
    indices = round([1/5, 2/5, 3/5, 4/5, 5/5] * length(current_clip));

    % ramp up on the first 20%
    current_clip(1:indices(1)) = current_clip(1:indices(1)) .* linspace(0, 1, indices(1));

    % ramp down on last 20%
    current_clip(indices(end-1):indices(end)) = current_clip(indices(end-1):indices(end)) .* linspace(1, 0, indices(end)-indices(end-1)+1);

    % write files
    audiowrite(sprintf('/Users/galraz1/Developer/looking_time/baby-experiment/stimuli/audio/music_%d.wav', i), current_clip/10, Fs);
end


%% test clips

% get 3 chunks of 60 sec snippets
snippetLength = Fs*60;

% start points and end points
startPoints = randi(length(x), [1 3]);
endPoints = startPoints + snippetLength;


% collect clips
for i = 1:3
    current_clip = x(startPoints(i):endPoints(i));
    
    % break chunk into 5 equal pieces
    indices = round([1/5, 2/5, 3/5, 4/5, 5/5] * length(current_clip));

    % ramp up on the first 20%
    current_clip(1:indices(1)) = current_clip(1:indices(1)) .* linspace(0, 1, indices(1));

    % ramp down on last 20%
    current_clip(indices(end-1):indices(end)) = current_clip(indices(end-1):indices(end)) .* linspace(1, 0, indices(end)-indices(end-1)+1);

    % write files
    audiowrite(sprintf('/Users/galraz1/Developer/looking_time/baby-experiment/stimuli/audio/music_test_%d.wav', i), current_clip/10, Fs);
end