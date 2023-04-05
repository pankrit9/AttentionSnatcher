import User from "../models/User";

/** READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ msg: err.message})
    }
}

export const getUserFriends = async (req, res) => {
    try{
        // returns the ids of all the friends of the user that was specified
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            // make multiple API calls to the db
            user.friends.map((id) => User.findBy(id))     // grab each id that the user has and all the info from each id
        );
        // make sure can be formatted properly for the frontend
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
};

/** UPDATE */
// add/remove friends
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;    // grabbing the ids
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // facebook same: if one friend removes the other, both are removed from each other's list, one of them adds -> added to both
        if (user.friends.includes(friendId)) {
            // check if the friendId is included in the main user's friends list 
            // if included, remove them
            user.friends.filter((id) => id !== friendId);   // grab the same array any time the given inequality is true, basically removing when the id != friendId
            friend.friends = friend.friends.filter((id)=> id !== id);   // if the curr id in this friend list and if it is equal, then remove it
        } else {
            // if not included, add to the friendlist using user.<id/friendID>.push
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // saving the updated lists 
        await user.save();
        await friend.save();
        
        /** formatting, similar to getUserFriends */
        const friends = await Promise.all(
            // make multiple API calls to the db
            user.friends.map((id) => User.findBy(id))     // grab each id that the user has and all the info from each id
        );
        // make sure can be formatted properly for the frontend
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
        
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}