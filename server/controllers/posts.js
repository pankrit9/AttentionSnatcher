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

/** READ */
export const getFeedPosts = async (req, res) => {
    // grab all the posts of everyone (something like a newsfeed for each)
    // create feed of a user
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

export const getUserPosts = async (req, res) => {
    // get the user feed
    try {
        const { userId } = req.params;  // get the requested user
        const post = await Post.find({ userId });   // grab all user posts
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

/** UPDATE */
export const likePosts = async (req, res) => {
    try {
        const { id } = req.params;  // grab the relevant postId (from the query string)
        const { userId } = req.body;    // from req.body as the userId is sent to the body by the frontend this time. ie. comes from the body
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId); // check if the userId exists in likes. ie. if userId is there in likes, -> post is liked by that user

        if (isLiked) {
            // if the user has already liked the post, unlike it 
            post.likes.delete(userId);
        }
        else {
            // sets it if it doesn't exist
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },   // post.likes = list of likes we modified above. Set the likes list to the new updated list
            { new: true }   // new object
        );

        res.status(200).json(updatedPost);  // updates the frontend once the like button is hit
    } catch (err) {
        res.status(404).json({ message: err.message});
    }    
};
