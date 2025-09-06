import ImageKit from 'imagekit';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const getPosts = async ( req, res ) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const query = {}

    const cat = req.query.cat;
    const author = req.query.author;
    const searchQuery = req.query.search;
    const sortQuery = req.query.sort || 'newest'

    if( cat ){
        query.category = { $regex: `^${cat}$`, $options: 'i' };
    }

    if( searchQuery ){
        query.title = { $regex: searchQuery, $options: 'i' }
    }

    if( author ){
        const user = await User.findOne({ username: author }).select('_id');  
        if( !user ){
            return res.status(404).json({ message: "Author not found" });
        }
        query.author = user._id;
    }

    let sortObj = { createdAt: -1 }; // default sorting by newest

    if( sortQuery ){
        // default sorting by newest
        switch( sortQuery ){
            case 'newest':
                sortObj = { createdAt: -1 }; // default sorting by newest
                break;
            case 'oldest':
                sortObj = { createdAt: 1 };
                break;
            case 'popular':
                sortObj = { visits: -1 };
                break;
            default:
                break;
        }
    }

    const posts = await Post.find(query)
      .populate("author", "username")
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);
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

    const role = req.auth().sessionClaims?.metadata?.role || "user";

    if( role === "admin" ){
        await Post.findByIdAndDelete(req.params.id);
        return res.status(204).json("Post has been deleted!");
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
