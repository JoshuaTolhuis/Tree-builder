# Tree-builder
A website that visualizes a phylogenetic tree

# How to install
To install this package please clone the github link using the command: `git clone https://github.com/JoshuaTolhuis/Tree-builder.git`.
After cloning the github some extra packages need to be manually installed.
First of all make sure Node.js is installed on your pc, this can be checked with `-v node`.
After Node.js is installed install some required node packages. This can be done using the `npm install` command.
These packages are: 
* Express.js  
* Phylotree.js  
* Pug.js  

For example:  
`npm install Express.js`

# How to run
In order to run the webpage please open up the commandline and navigate to the location of the installed github folder.
When located within the github folder run the command `node index.js`. This should start the webpage on https://localhost:3000.  

# How to use
After the code has been started. The user can go to https://localhost:3000.  
The user should be greeted with this view:  
(img here)  
From here the user can insert the file of their choosing: Newick, Fasta or txt Files work with this setup. 
*important* dont forget to select the right corresponding type with the selection button when using a file as input.  

It is also possible to insert a text inside the text field, do note this only responds to Newick type texts.

# Dependencies.
In order to use this program this user needs to have installed before:
* A web browser of your choice.
* Node.js

And if developing the user might want to install:
* nodemon.js
