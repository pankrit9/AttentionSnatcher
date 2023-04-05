// controllers for the posts.js in routes
import Post from "../models/Post.js";
import User from "../models/User.js";

/** CREATE */
// to create the posts 
// NOTE: middleware creates the picture, this just creates the logic behind it
export const createPost = async (req,res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            // creating new post in the db
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {
                // "someid": true      // determines if someone has liked, otherwise the object is empty
            },
            comments: []
        })
        await newPost.save();   // to make sure it is saved on monogodb

        const post = await Post.find(); // grabs all the posts

        res.status(201).json(post);     // returns the updated list of posts (all the posts) to the frontend
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}