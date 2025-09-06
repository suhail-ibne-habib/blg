import ImageKit from 'imagekit';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const getPosts = async ( req, res ) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const posts = await Post.find()
      .populate("author", "username")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments();
    const hasMore = totalPosts > page * limit;

    res.status(200).json({ posts, hasMore });
};

export const getPost = async ( req, res ) => {

    const post = await Post.findOne({ slug: req.params.slug })
        .populate("author", "username img");

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
};

export const createPost = async ( req, res ) => {

    const clerkUserId = req.auth().userId;

    if( !clerkUserId ){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkUserId });

    if( !user ){
        return res.status(404).json({ message: "User not found" });
    }

    let slug = req.body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    let ifExistSlug = await Post.findOne({ slug });

    let counter = 2;

    while( ifExistSlug ){
        slug = `${slug}-${counter}`;
        ifExistSlug = await Post.findOne({ slug });
        counter++;
    }

    const newPost = new Post({
        ...req.body,
        slug,
        author: user._id
    });

    await newPost.save();
    res.status(201).json(newPost);

};

export const deletePost = async ( req, res ) => {

    const clerkUserId = req.auth().userId;

    if( !clerkUserId ){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne( {clerkUserId} );

    if( !user ){
        return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.findByIdAndDelete(req.params.id, { author: user._id });
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(204).json("Post has been deleted!");
};

export const getImageKitInstance = () => {
  return new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_END_POINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
  });
};

export const uploadImgAuth = async( req, res ) => {

    const imagekit = getImageKitInstance();
    const result = imagekit.getAuthenticationParameters();
    res.send(result);

}
