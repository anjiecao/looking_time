# Documentation

## Logic of  experiment.html

**experiment.html** is the central file in this repo. It plays two roles:
1) It is the main experiment file, so it can be run in a browser window as the main experiment
2) It contains the code which controls the main flow of the experiment.

### Loading block types through helper functions

**experiment.html** first loads all the possible types of blocks. This is achieved through three helper functions:
 - `get_all_stimuli()`: Generates an object which contains three arrays. Each array is a list of paths to all the stimuli files of one stimulus type (background, deviant, probes). The output of this function (let's call it `'paths'`) indexed by the stimulus type will return this array. For example `get_all_stimuli().background` will return an array of paths to all the background stimuli.
 - `generate_set_combination(paths)`: Takes as input the path object described above, and returns an object (let's call it `obj`) in which each possible block type is generated and labelled. It follows an indexing scheme where the first index refers to the background stimulus, and the second to the deviant stimulus.
    - Since there are four types of background stimulus (two simple and two complex) the first level of this object has four possible indices: `simple_a`, `simple_b`, `complex_a` or `complex_b`.
    - The second level now refers to the deviant's complexity, as well as its relationship to the background, and there are again four possible indices `simple_similar`, `simple_dissimilar`, `complex_similar` or `complex_dissimilar`.
    - Example: `obj.complex_a.simple_dissimilar` will return an object with the path to the first complex background image, as well as the path to the simple deviant that is dissimilar to that background, like so:

             {background: "images/stimuli/1/background/3.png",
               deviant: "images/stimuli/1/deviant/2.png"}
- `add_probes(obj, paths)`: This function takes as input the paths and the object described above, and returns the same object into which it inserts the paths to the possible memory probes for each of these block types. There are four possible probes for each block type: 1) identical to background, 2) similar to background, 3) identical to deviant and 4) novel stimulus. `add_probes(obj, paths)` adds an array of four paths, one for each possible probe. Therefore, after running `add_probes(obj, paths)`, running the same command as above (`obj.complex_a.simple_dissimilar`) will return the following object:

         {background: "images/stimuli/1/background/3.png",
           deviant: "images/stimuli/1/deviant/2.png",
           probes: ["images/stimuli/1/probes/3.png",
                    "images/stimuli/1/probes/6.png",
                    "images/stimuli/1/probes/11.png",
                    "images/stimuli/1/probes/14.png"]}


### Experiment parameters
We will return to why exactly those paths were loaded in the next section. But for now, let's proceed with how experiment.html controls the experimental flow. After `obj` has been generated, the three main parameters of the experiment are determined:
- `SET_NUM`: The number of stimuli sets (composed of four background, four deviant and sixteen memory probes)
- `BLOCK_LENGTH`: The length of each block, which will be composed of `BlOCK_LENGTH-1` background presentations and one deviant presentation.
- `POSSIBLE_DEV_POSITION`: A list of integers denoting the positions in the block in which the deviant can appear.

### Pushing blocks to the timeline
With `obj` storing the block types, we use the parameters above to loop through three levels:
- The outermost loop is based on the length of `POSSIBLE_DEV_POSITION`.
- The second loop goes through each background type (in this case four).
- The innermost loop goes through each deviant type.

In the center of all of these loops, two things happen:
- The block of the specified length is filled with background stimuli, except for the deviant at the position specified by the outermost loop. This block is then pushed to the [`jsPsych`](https://www.jspsych.org/) timeline for stimulus presentation.

- An index is generated which randomly chooses from the array of memory  probes. This probe is then also pushed to the timeline, right after the background-deviant block, along with a prompt to respond whether the participant has seen the probe in the preceding block.

## The images/stimuli folder
How do I know which paths will be returned after running the example command `obj.complex_a.simple_dissimilar` in the previous section? The answer lies in the folder structure of the images/stimuli folder, which contains the stimuli that are displayed during the experiment.
The folder structure is as follows:

* Stimuli
    * SET (1,2,3..)
        *  Background
            - 1.png
            - 2.png
            - 3.png
            - 4.png
        * Deviant   
             - 1.png
            - 2.png
            - 3.png
            - 4.png
        * Probes
            - 1.png
            - 2.png
            - ...
            - 16.png

### The relationship of the the images by file name

The names of the .png files are important and determine the relationship of the stimuli to one another. When we plot the complexity of the four deviants, as well as their similarity to the various particular background images, we get the following:
![alt text](https://github.com/anjiecao/looking_time/blob/main/images/readme/background_deviants.jpg?raw=true)

The way to read this plot is that, for example, the deviant in 1.png is similar to the background image in 1.png and simple, while 4.png is dissimilar to 1.png and complex.

Furthermore, there are 16 images in the 'Probes' folder. The numbering scheme is depicted below:
![alt text](https://github.com/anjiecao/looking_time/blob/main/images/readme/probe_scheme.jpg?raw=true)

That is, images 1 to 4 are identical to the background images (in that order), images 5 to 8 are identical to the deviant images.
images 9 to 12 are similar to the background, and images 13 to 16 are novel memory probes (subject to change).

You should now be able to understand why the output of `obj.complex_a.simple_dissimilar` would return:

         {background: "images/stimuli/1/background/3.png",
           deviant: "images/stimuli/1/deviant/2.png",
           probes: ["images/stimuli/1/probes/3.png",
                    "images/stimuli/1/probes/6.png",
                    "images/stimuli/1/probes/11.png",
                    "images/stimuli/1/probes/14.png"]}

The reason is that `complex_a` corresponds to the complex background image `3.png`, `simple_dissimilar` corresponds to `2.png`, because it is the deviant that is simple and dissimiliar to that background image. This can be seen in **Figure 1**. The probes corresponding to this background-deviant pair are `3.png` (identical to background), `6.png` (identical to deviant), `11.png` (similar to background) and `14.png` (a novel stimulus). This can be seen in **Figure 2**.
