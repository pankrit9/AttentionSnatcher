import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenutoggle] = useState(false); // setIsMobileMenuToggle: to determine if we want to open the mobile menu when it is in the small screens; used to toggle the menu on-off
  const dispatch = useDispatch(); // to dispatch actions from the reducer
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // grab the user info
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // hook built into mui to determine if the curr screen size is lower or higher to the value input in it

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.Light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75REM">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)" // clamp() determines a min, preferred & max val for a font
          color="primary" // light blue
          onClick={() => navigate("/home")}
          sx={{
            // this is where the css properties can be put in
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          AttentionSnatcher
        </Typography>
        {isNonMobileScreens && (
          // if is a non mobile screen
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            {/* 0.1 top-bottom and 1.5rem for left-right */}
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* about to use redux to switch modes bw light and dark */}
          <IconButton onClick={() => dispatch(setMode())}>
            {/* button for light/dark mode of the website */}
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          {/* for the drop down at the top right (can see the user logged in and the logoout button*/}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root:": {
                  // select within the css class (target a specific class)
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />} // passed an input of inputbase
            >
              <MenuItem value={fullName}>
                {/* this is just a button inside a dropdown */}
                <Typography>{fullName}</Typography>
              </MenuItem>
              {/* after clicking on the menuItem, it takes us and logs us out of the page */}
              <MenuItem onClick={() => dispath(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          // icon button -> flips it
          onClick={() => setIsMobileMenutoggle(!isMobileMenuToggled)}
        >
          {/* pops up in the icon of the menu, only when we're in small screens */}
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {/* if it is a mobile screen, and when we click the menu icon, it should open a box that will have the icons in there */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0" // so it takes the height of the whole page
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenutoggle(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="2rem"
            >
              {/* about to use redux to switch modes bw light and dark */}
              <IconButton onClick={() => dispatch(setMode())}>
                {/* button for light/dark mode of the website */}
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              {/* for the drop down at the top right (can see the user logged in and the logoout button*/}
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    padding: "0.25rem 1rem",
                    "& .MuiSvgIcon-root:": {
                      // select within the css class (target a specific class)
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />} // passed an input of inputbase
                >
                  <MenuItem value={fullName}>
                    {/* this is just a button inside a dropdown */}
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  {/* after clicking on the menuItem, it takes us and logs us out of the page */}
                  <MenuItem onClick={() => dispath(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        </Box>
      )}
    </FlexBetween>
  ); // note: FlexBetween is the reusable component used. Comes with the default properties defined in src/components/FlexBetween
};

export default Navbar;
