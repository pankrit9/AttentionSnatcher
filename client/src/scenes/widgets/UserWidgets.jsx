// the user widget on the left side of the home page
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidgets = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null); // grab the user from the backend
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    // calling the api to get the user info to display
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },  // middleware/auth there is Bearer to get the token (verified)
        });
        const data = await response.json();
        setUser(data);
    };

    // when we enter this page, api call to getUser will be called when we render this page/component for the first time
    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // typically there is a loading component while the user is waiting for the api call to finish
    // not handling the loading states for the project
    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewdProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem" // padding bottom
                onClick={() => navigate(`/profile/${userId}`)}// go to profile on click
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                }
                            }}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />

                {/* SECOND ROW */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{ color: main}}/>
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined fontSize="large" sx={{ color: main}}/>
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>

                {/* THIRD ROW */}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Who's viewed your profile</Typography>
                        <Typography color={main} fontWeight="500">
                            {viewdProfile}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>Impressions of your post</Typography>
                        <Typography color={main} fontWeight="500">
                            {impressions}
                        </Typography>
                    </FlexBetween>
                </Box>

                {/* FORTH ROW */}
                <Box p="1rem 0">
                    <Typography fontSize="1ren" color={main} fontWeight="500" mb="1rem">
                            Social Profiles
                    </Typography>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="../assets/twitter.png" alt="twitter" />
                            <Box>
                                <Typography color={main} fontWeight="500">Twitter</Typography>
                                <Typography color={medium}>Social Network</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>

                    
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="../assets/linkedin.png" alt="linkedin" />
                            <Box>
                                <Typography color={main} fontWeight="500">LinkedIn</Typography>
                                <Typography color={medium}>Network Platform</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>
                </Box>

            </FlexBetween>
        </WidgetWrapper>
    )
};

export default UserWidgets;