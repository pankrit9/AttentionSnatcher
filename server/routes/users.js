import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read routes represent : to grab info (not saving/changing anything in the db)

/** READ */
// since there is a route in 'index.js' for `/users`
// this route is `/users/:id` (some id: query string)
// verifyToken is done before the main function, to check authorization of the user
router.get("/:id", verifyToken, getUser);   // grabs the user
router.get("/:id/friends", verifyToken, getUserFriends);    // grab the user friend

/** UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);   // updating the friendId, who do we want to add/remove, more like facebook, where one can add/remove friends unlike twitter with followers

export default router;