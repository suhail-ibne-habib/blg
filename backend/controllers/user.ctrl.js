import User from "../models/user.model.js";

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
};

export const getUserSavedPosts = async (req, res) => {
  try {
    const clerkUserId = req.auth()?.userId;

    console.log(clerkUserId)

    if (!clerkUserId) {
      return res.status(401).json("Not Authenticated");
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user.savedPosts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const savePost = async( req, res ) => {

    const clerkUserId = req.auth()?.userId;
    const postId = req.body.postId

    if( !clerkUserId){
        return res.status(401).json("Not Authenticated")
    }

    const user = await User.findOne({clerkUserId})

    const isSaved = user.savedPosts.some(p => p === postId)

    if(!isSaved){
        await User.findByIdAndUpdate(user._id, {
            $push: { savedPosts: postId }
        })
    }else{
        await User.findByIdAndUpdate( user._id, {
            $pull: { savedPosts: postId }
        })
    }

    res.status(200).json( isSaved ? "Post saved" : "Post unsaved" )


}