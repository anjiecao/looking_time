# Project status
This project is in development.

# Looking time - Adult experiment

# File descriptions:
experiment.html has two main functions:
1) It can be run in a browser window as the main experiment
2) It contains the code which controls the main flow of the experiment.


# The images folder
The images folder contains the stimuli that will be displayed.
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

![alt text](https://github.com/anjiecao/looking_time/images/readme/image.jpg?raw=true)



The way to read this plot is that, for example, the deviant in 1.png is similar to the background image in 1.png and simple, while 4.png is dissimilar to 1.png and complex.

Furthermore, there are 16 images in the 'Probes' folder. The numbering scheme works as follows:
- Probes 1.png - 4.png are identical to Background 1 - 4.png
-
        * Probes
            - 1.png
            - 2.png
            - ...
            - 16.png



# The js folder

This folder contains scripts of two types:
- 1. jspsych-scripts for displaying certain stimuli.
- 2. Helper functions
