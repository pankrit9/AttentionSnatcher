import {
    ChatBubbleOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Typography, IconButton, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "state";

// likes = {
//     // only the users who liked the post will be in this object
//     "userId1": true,    // userId1 liked the post
//     "userId2": true
// }

const PostWidget = ({
  postId,
  postUser_id,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]); // likes is of type object, so we can use the id as a key and value as boolean (posts model in backend)
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      // `http://localhost:3001/posts/${postId}/like`, {
      `https://attention-snatcher-backend.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }), // so backend knows who is liking the post
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUser_id}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
{/* POST PICTURE */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          // src={`http://localhost:3001/assets/${picturePath}`}
          src={`https://attention-snatcher-backend.onrender.com/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
{/* LIKES BUTTON -> whether someone has liked this or not */}
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
{/* COMMENTS BUTTON ->opens the comments section */}
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
{/* DISPLAY THE ACTUAL COMMENTS */}
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              {" "}
              {/* key is the name of the user and the index of the comment */}
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "10rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
{/* INPUT: TO ADD NEW COMMENTS */}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
