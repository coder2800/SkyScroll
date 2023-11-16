# SkyScroll

SkyScroll is a full stack notes application in which the user can signup, login, access his notes, edit the notes etc. This is created using Node.js, Express.js and MongoDB for the backend and database purposes. Frontend React.js has been used along with bootstrap and CSS.

##Setting up -
1. Clone the repository using `git clone` command.
2. Run `npm install`. Also run the same the same command in the backend folder.
3. Run `npm run both` to run both the backend and the frontend.

## Libraries used - 

1. Express
2. Bcrypt
3. Mongoose
4. JWT
5. CORS
6. React
7. React-router-dom
8. Concurrently (as a dev dependency)
9. Nodemon (as a dev dependency)

Bcrypt has been used for the purpose of hashing the password that is to be stored in the database. After sign-up and login the user is given a JWT token through which he can access only his notes. Two MongoDB models have been created - Notes and User. The backend has been set to port 8000 and the frontend has been set to run on port 5000 by default.

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
