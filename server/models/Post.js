// refer to the data model and mimic into code

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,  // an object is stored like a map
            of: Boolean,    // all have to do is check if the user id exists in this map, the value for the id will be true, always, if it exists
            // if someone likes the post, their id is going to be added to the map
        },
        comments: {
            type: Array,
            default: [],
        }
    },
    { timestamps: true}
);

const Post = mongoose.model("Post", PostSchema) // created the schema using the model

export default Post;    // now we have our post model