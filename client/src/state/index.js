// logic for the entire application (State) for redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // initially the state that is stored in the global state
    // data is accessible from anywhere in the application

    // setting up the entire state
    mode: "light",  // represents dark and light mode
    // auth information
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { // functions that involve modifying the above global states
        setMode: (state) => {
            // change from light-mode to dark-mode
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            // action is the argument for the function: both the lines below are just params

            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            // reset the states to have nothing in there
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            // sets the friends in our local state (as we need to keep this info)
            if (state.user) {
                // if user already there
                state.user.friends = action.payload.friends;
            }
            else {
                console.error("user friends non-existant :(");
            }
        },
        setPosts: (state, action) => {
            // just set the post
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            // grab the list of posts
            // map through each on
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
