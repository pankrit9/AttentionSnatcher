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

# ---------------- # ---------------- # ---------------- # ---------------- 
# CURRENT ISSUES
# ---------------- # ---------------- # ---------------- # ---------------- 
- user.firstName lastName not working in client/src/scenes/navbar
    - prolly coz haven't signed up on the server
    - workaround : hard coded the first name and last name so the user functions might not work, till I resolve the sign up issue

# ---------------- # ---------------- # ---------------- # ---------------- 
# DATABASE NOTES
# ---------------- # ---------------- # ---------------- # ---------------- 

# Database tips
## if we have any fake data inserted in the db
- on changing the code, we need to delete (drop) the data from mongodb manually.
- go to collections and manually remove each set
- uncomment the fake data inserting lines in sever/index.js 

# ---------------- # ---------------- # ---------------- # ---------------- 
# RUNNING THE APP
# ---------------- # ---------------- # ---------------- # ---------------- 

# Terminal usage
- started with `npm init -y` after installing the packages and dependencies
- `nodemon index.js` to run the server
-  

# ---------------- # ---------------- # ---------------- # ---------------- 
# BACKEND NOTES
# ---------------- # ---------------- # ---------------- # ---------------- 

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
- middleware is used: uploads a image locally into the public/assetes dir (middleware function)
- then the actual logic is hit: register controller (functionality)

## 4. ROUTES
- handling of the routes (api) calls from the server
- helps set up the routes and keeps the files organised and clean

### Three routes under user-routes
- get the user
- get user's friend list
- update user's friend list by adding/removing friends

# ---------------- # ---------------- # ---------------- # ---------------- 
# FRONTEND NOTES
# ---------------- # ---------------- # ---------------- # ---------------- 

# Running the frontend for the first time:
## install npx
- `npm i -g npx`

## run the react app in parant dir for the first time
- `npx create-react-app client`

------------------------------------------
## installing other frontend dependencies
------------------------------------------
#### Terminal command:
`client % npm i react-redux @reduxjs/toolkit redux-persist react-dropzone d
otenv formik yup react-router-dom@6 @mui/material @emotion/react @emotion/styled @mui/icons-material`
- redux: popular enterprise level state management tool 
- redux toolkit
- redux-persist: save to local storage of the browser (no need to register again and again)
- react-dropzone: handles the file upload and file handling in the frontend, to send to backend
- dotenv: for environment variables
- formik: for form handling
- yup: for validation
- react-router-dom@6: handling react router (different routes and pages)
- material ui: 

------------------------------------------
# FILES, EXPLAINED
------------------------------------------

## /SRC/SCENES
this is where the layouts for different pages and components is set
### index.jsx
the .jsx represents files containing react components in them

## SRC/COMPONENTS
This is where the common(global) components can go

## SRC/STATE
redux and toolkit information

## src/theme.js
contains the color palette for the dark and light themes
#### How to use the colors from the theme: eg:
- `palette.neutral.main` if in dark mode gives grey[200], else gives grey[500]

## client/jsconfig.json
- what this file does is, now whenever we need to import anything, we can just put the path starting from '/src/'. as in, we can assume we;re already in src. so no need to mention src

--------- --------- --------- --------- --------- 
## client/src/scenes/navbar/index.jsx
--------- --------- --------- --------- --------- 
- contains all the themes (colors for background, dark-mode and the light-mode)
- covers the code for all sizes of menus, for the desktop screens and for the mobile screens
- the logo, the search, the buttons in the navbar, etc.
- one of the bigger components of the application for the frontend side

## client/src/scenes/loginPage/Form.jsx
- This is where the register functionality is handled

- schemas for the validation
- initialValueRegister for the initial values of the form

- the logic behind what happens any time someone clicks submit is handled by the button type: Submit 
    - (onSubmit) is run -> which is essentially handleFormSubmit
