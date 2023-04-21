import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);


    // two different api calls
    // API 1 = grabs all the posts from anybody (getFeedPosts)
    // API 2 = grabs all the posts from a specific user (getUserPosts)
    const getPosts = async () => {
        const response = await fetch(
            // "http://localhost:3001/posts", {
            "https://attention-snatcher-backend.onrender.com/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));        // update the posts data
    };

    const getUserPosts = async () => {
        const response = await fetch(
            // `http://localhost:3001/posts/${userId}/posts`, {
            `https://attention-snatcher-backend.onrender.com/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));        // update the posts data
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // the above empty array is to make sure that the useEffect only runs once

    return (
        <>
            {Array.isArray(posts) &&
                posts.map(
                // creating a component for each post that we get
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget 
                        key={_id}
                        postId={_id}
                        postUser_id={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;