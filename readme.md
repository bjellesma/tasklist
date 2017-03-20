#Tasklist
* [What Is This](#What-is-this "What is this")
* [Prerequisites](#Prerequisites "Prerequisites")
* [Quick Start](#Quick-Start "Quick Start")
* [Author](#Author "Author")

<a name="What-is-this"><h1>What Is This</h1></a>
  <p>This is a simple tasklist written using the MEAN (mongodb, express, angular, and nodejs) stack. Mostly this is a project for learning the stack</p>

<a name="Prerequisites"><h1>Prerequisites</h1></a>
* Download and install [NodeJS](https://nodejs.org/en/download/)
* Download and install [Bower](https://bower.io/) (Downloading bower requires nodejs first)
* (Windows only!) A shell is recommended to run the program so the [git bash](https://git-scm.com/downloads) is very useful

<a name="Quick-Start"><h1>Quick Start</h1></a>
* Download or clone this repo
* fill in information in .env-example file and remove "-example" from filename
  * These variables refer to a mongodb install (I recommend creating a free database on [mlab](https://mlab.com)) and create two collection
  * tabs
    * each document should have the following two fields
      * display - This field will be what you want the name to show up as in the webpage
      * name - this must be the same as the category document field for the tasks collection
  * tasks
    * each document should have the following three fields
      * title - This field will be how you want the task to be read on the webpage
      * isDone - This field will be either true or false to indicate if the task is checked off or not
      * category - This field must be the same as the name document field of the tabs collection
* Navigate to the directory you just downloaded using the command line or shell
* run `./installs.sh` (linux) or `./installs.bat` (windows) to install all of the components
* Navigate back to the main directory and run `node server` to start the server
* Go to 127.0.0.1:3000 in a web browser


<a name="Author"><h1>Author</h1></a>
  <p>This project was authored by William Jellesma. </p>
