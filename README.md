# SkyScroll

SkyScroll is a full stack notes application in which the user can signup, login, access his notes, edit the notes etc. This is created using Node.js, Express.js and MongoDB for the backend and database purposes. 

## Libraries used - 

1. Express
2. Bcrypt
3. Mongoose
4. JWT 

Bcrypt has been used for the purpose of hashing the password that is to be stored in the database. After sign-up and login the user is given a JWT token through which he can access only his notes. Two MongoDB models have been created - Notes and User.

The routes that have been setup include - 
 ## For Auth - 
 1. /createuser
 2. /login
 3. /getuser

 ## For notes - 
 1. /getnotes
 2. /addnotes
 3. /updatenotes
 4. /deletenotes

## Created by - Devansh Agarwal (coder2800)
