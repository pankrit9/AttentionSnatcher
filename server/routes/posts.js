import express from "express";
import { getFeedPosts, getUserPosts, likePosts } from "../controllers/posts.js";    // all the controllers, not created initially
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/** READ */
router.get("/", verifyToken, getFeedPosts); // grabs the user feed, when on home page
// every single post is shown, not the case with a production level app (should be curated, according to the relevance)
router.get("/:userId/posts", verifyToken, getUserPosts);    // grab only the relevant user mentioned in the route's posts and no one else's (profile posts after clicking on a particular user)

/** UPDATE */
router.patch("/:id/like", verifyToken, likePosts);  // for liking and unliking a post

export default router;