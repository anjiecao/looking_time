# Documentation

### Logic of  experiment.html

**experiment.html** is the central file in this repo. It plays two roles:
1) It is the main experiment file, so it can be run in a browser window as the main experiment
2) It contains the code which controls the main flow of the experiment.

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
           probes: ["images/training/1/probes/3.png",
                    "images/training/1/probes/6.png",
                    "images/training/1/probes/11.png",
                    "images/training/1/probes/14.png"]}


# The images/stimuli folder
How do I know which paths will be returned after running the example command above? The answer lies in the folder structure of the images/stimuli folder, which contains the stimuli that are displayed during the experiment.
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

If you go back to the first section about the output of the command, you should be able to understand why the output of `obj.complex_a.simple_dissimilar` would return:

         {background: "images/stimuli/1/background/3.png",
           deviant: "images/stimuli/1/deviant/2.png",
           probes: ["images/training/1/probes/3.png",
                    "images/training/1/probes/6.png",
                    "images/training/1/probes/11.png",
                    "images/training/1/probes/14.png"]}

# The js folder

This folder contains scripts of two types:
- 1. [jsPsych](https://www.jspsych.org/) scripts for displaying the stimuli easily.
- 2. Helper functions (described above in **Logic of  experiment.html**)
