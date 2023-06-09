import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js";

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/** CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);  // only used with type = module (in package.json)
const __dirname = path.dirname(__filename);     // only used with type = module (in package.json)
dotenv.config();

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
console.log(process.env.FRONTEND_URL)
app.use(
  cors({
    // origin: "*",
    // origin: process.env.FRONTEND_URL,
    origin: true,
  })
);

app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));  // sets the directory of where we keep our assets (images)

/** FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        // set filename
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });     // any time we need to upload a file, use the variable `upload`
const pictureField = 'picture';

/** ROUTES WITH FILES */
// route mentioned is hit
// middleware is used: uploads a picture locally into the public/assets dir (middleware function)
// then the actual logic is hit: register controller (functionality)
app.post("/auth/register", upload.single(pictureField), register);     // this is not in the routes folder, as we need the upload variable to invoke this
app.post("/posts", verifyToken, upload.single(pictureField), createPost); // when we post, need to allow the user to post a picture. setting the property to "picture". `createPost` is a controller. 

/** ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;  // if the first port doesn't work for some reason, go to port 6001
// connect to actual db from node server 
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /** ADD DATA ONE TIME MANUALLY*/
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));