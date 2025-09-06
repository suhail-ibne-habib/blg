import Comment from '../models/Comment.model.js'
import User from '../models/user.model.js';

export const getComments = async ( req, res ) => {

    const { postId } = req.params;

    const comments = await Comment.find({ post: postId }) // filter by post
      .populate('author', 'username img')              // populate author info
      .sort({ createdAt: -1 });                        // optional: latest first

    res.json(comments);
}

export const createComment = async ( req, res ) => {

    const clerkUserId = req.auth().userId;

    if( !clerkUserId ){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const author = await User.findOne({ clerkUserId });

    
    if( !author ){
        return res.status(404).json({ message: "User not found" });
    }

    const { postId } = req.params;

    const newComment = await Comment.create({
        content: req.body.content,
        post: postId,
        author: author._id
    });

    setTimeout( () => {
        res.status(201).json(newComment);
    }, 2000 );


}

export const deleteComment = async ( req, res ) => {
    const clerkUserId = req.auth().userId;

    if( !clerkUserId ){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.auth().sessionClaims?.metadata?.role || "user";

    console.log("Role: ", role);
    
    if( role === "admin" ){
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(204).json("Post has been deleted!");
    }

    const author = await User.findOne({ clerkUserId });

    if( !author ){
        return res.status(404).json({ message: "User not found" });
    }

    const id = req.params.id;

    if( !id ){
        return res.status(400).json({ message: "Comment ID is required" });
    }

    const deletedComment = await Comment.findOneAndDelete({ _id: id, author: author._id });

    if( !deletedComment ){
        return res.status(404).json({ message: "Comment not found or you are not the author" });
    }
}