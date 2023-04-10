import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidgets from "scenes/widgets/UserWidgets";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"} // bigger screen: 3 components side by side, smaller screen: 3 components stacked on top of each other
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidgets userId={_id} picturePath={picturePath} />
                </Box>
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    {/* <Feed /> */}
                </Box>
                {/* Friends list */}
                {isNonMobileScreens && (<Box flexBasis="26%"></Box>)}
            </Box>
        </Box>
    );
};

export default HomePage;