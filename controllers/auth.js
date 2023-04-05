import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** REGISTER USER */
// like an api call from frontend to backend to db
export const register = async (req, res) => {   
    // req from the frontend, res send to the frontend
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;       // structuring the paras/args mentioned above from the req body

        const salt = await bcrypt.genSalt();    // encryption, use the 'salt' to encrypt the password
        const passwordHash = await bcrypt.hash(password, salt); // password -> encrypted

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        // save the user
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);    // send the user if the above doesn't error out, send a status of 201 (something is created), created a json version of the saved user so frontend can comprehend
    } catch (err) {
        res.status(500).json({ error: err.message })    // if there is an error, frontend gets the error message with the status code of 500
    }
}

/** LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });  // used mongoose to try to find the one that has the specific email. Bring back all the user info in `user`
        
        if (!user) return res.status(400).json({ msg: "User does not exist." }); // cant find

        // check if we find a match for the passowrd found for the above email
        const isMatch = await bcrypt.compare(password, user.password);  // password = password the client just sent, user.password = password already saved in the system
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);   // second arg is the string from .env file (a very hard string to create a hashed token using the user id and the string)
        delete user.password;   // so the password doesn't get sent back to the frontend
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}