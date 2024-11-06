import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    let totalLikes = 0;
    let totalDislikes = 0;

    const postsWithLikesAndDislikes = await Promise.all(
      posts.map(async (post) => {
        const postLikes = post.likes ? post.likes.length : 0;
        const postDislikes = post.dislikes ? post.dislikes.length : 0;

        totalLikes += postLikes;
        totalDislikes += postDislikes;

        return {
          ...post.toObject(),
          totalLikes: postLikes,
          totalDislikes: postDislikes,
        };
      })
    );

    res.status(200).json({
      posts: postsWithLikesAndDislikes,
      totalPosts,
      lastMonthPosts,
      totalLikes,
      totalDislikes,
    });
  } catch (error) {
    next(error);
  }
};


export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const toggleLikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    const userIndex = post.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      post.likes.push(req.user.id);
      await post.save();
      res.status(200).json({ message: 'Post liked', likesCount: post.likes.length });
    } else {
      post.likes.splice(userIndex, 1);
      await post.save();
      res.status(200).json({ message: 'Post unliked', likesCount: post.likes.length });
    }
  } catch (error) {
    next(error);
  }
};

export const toggleDislikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    const userDislikeIndex = post.dislikes.indexOf(req.user.id);
    const userLikeIndex = post.likes.indexOf(req.user.id);

    if (userDislikeIndex === -1) {
      post.dislikes.push(req.user.id);
      if (userLikeIndex !== -1) {
        post.likes.splice(userLikeIndex, 1);
      }
      await post.save();
      res.status(200).json({ message: 'Post disliked', dislikesCount: post.dislikes.length, likesCount: post.likes.length });
    } else {
      post.dislikes.splice(userDislikeIndex, 1);
      await post.save();
      res.status(200).json({ message: 'Post undisliked', dislikesCount: post.dislikes.length });
    }
  } catch (error) {
    next(error);
  }
};
