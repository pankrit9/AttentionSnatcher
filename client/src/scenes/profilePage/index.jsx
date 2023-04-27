import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import UserWidget from "scenes/widgets/UserWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import Navbar from "scenes/navbar";

const ProfilePage = () => {
    const [user, setUser] = useState(null); // keep the local state
    const { userId } = useParams(); // get the userId from the url
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const getUser = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${userId}`, 
            // `https://attention-snatcher-backend.onrender.com/users/${userId}`, 
            {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        console.log("data: ", data);
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"} // bigger screen: 3 components side by side, smaller screen: 3 components stacked on top of each other
                gap="2rem"
                justifyContent="center"
                >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
{/* User Widget */}
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m='2rem 0' />
{/* FRIEND LIST WIDGET */}
                    <FriendListWidget userId={userId} />
                </Box>
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
{/* Create Post Widget */}
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    {/* only grab curr user's profile */}
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage;