# StacksOfWax2
Instructions on how to run the system locally

-Your computer should have XAMPP installed if it is using WindowsOS, or MAMP if using MacOS. 

-Your computer should have VS code installed.

-Download and unpack the attached zip file.

-In XAMPP/MAMP, start with the apache web server. MySQL will run on port 3306 on WindowsOS, and on port 8889 on MacOS. The default setup is for MacOS. If using WindowsOS, within VS code access the ‘connection.js’ file and change the following:

password : ‘’,
port : 3306

-PhpMyAdmin server should be automatically opened after clicking ‘start’ in MAMP.

-Create a new database ‘40371893’ and import the file ‘40371893.sql’ via the ‘Import’ button

-In Visual Studio code, open a new terminal.

-Enter the command ‘npm install’ to populate the dependencies in the package.json file.

-Enter the command ‘npm install nodemon –save-dev'

-Enter the command ‘npx nodemon’.

-Enter the url ‘http://localhost:3000’ in Google Chrome and the website should now be browsable.
