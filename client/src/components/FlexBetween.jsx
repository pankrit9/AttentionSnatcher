import { Box } from "@mui/material";
import {styled} from "@mui/system";

const FlexBetween = styled(Box) ({  // mui has box components like `Box` used here, allows us to pass in any css properties and then use them as their property like done in client/src/scenes/navbar 's return line
    // style component
    // we can pass in css in this section
    // by doing the below, it allows us to use these properties wherever
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

export default FlexBetween;