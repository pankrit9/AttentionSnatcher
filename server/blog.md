# packages and modules
- express: for library
- body-parses: to process the body
- bcrypt: for password encryption
- cors: for cross-origin request
- dotenv: for environment variables
- grids-stream: for file upload
- multer and multer-gridfs-storage: to upload the files locally
- helment: for request safety
- morgan: for logging
- jsonwebtoken: for authentication
- mongoos: for mongodb access

# Terminal usage
started with `npm init -y` after installing the packages and dependencies

# Definitions

# FOLDERS AND FILE INFORMATION

## .env file
- contains the information to connect to the mongodb db
#### NOTE:
- our frontend will run on port 3000 and backend on port 3001

## controllers folder
### auth.js file
- this is where the authentication logic is handled.
- to encrypt the password and the token work 
- jwt: a way to send user a web token to deal with the authorisation without revealing the actual information
- the login callback function handles the verification of the user entered login details for logging in.
- not very safe for all use cases. 
- A very basic authentication system implemented

#### functionality of register function
new user object is created: 
- we encrypt the password
- save it
- when the user tries to log in 
- they're gonna provide the password
- we're gonna salt that again and verify with the old hash
- if it is the correct one, give them a json web token (jwt)

sending to the frontend:
- send the user if the above doesn't error out, send a status of 201 (something is created), 
- created a json version of the saved user so frontend can comprehend

### routes folder
- contains the path and the routes for every feature (auth feature)
- NOTE: the register route is not in the routes folder as invoking and using that functionality requires the use of 'upload' variable, which is only present in the index.js

# SECTIONS
## 1. CONFIGURATIONS
- includes all the middleware configurations as well as different package configurations
- middlware: something that runs in-between requests basically functions that run in-between different things

## 2. FILE STORAGE
- saving the files to the destination mentioned
- whenver someone uploads a file on our website, it goes to the destination, which is `public/assets` in our case and saves there
### about multer
- can get all the information about the code (multer) from github repo of multer

## 3. ROUTES WITH FILES
### in each app.post()
- route mentioned is hit
- middleware is used: uploads a picture locally into the public/assetes dir (middleware function)
- then the actual logic is hit: register controller (functionality)

## 4. ROUTES
- handling of the routes (api) calls from the server
- helps set up the routes and keeps the files organised and clean

### Three routes under user-routes

