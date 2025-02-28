const { default: mongoose } = require("mongoose");
const Post = require("../models/postModel");

const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments({});

    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex).populate("creator", "name");

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPostsByQuery = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Post.find({ title });

    res.json({data: posts})
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = await Post.create({ ...post, creator: req.userId });
  try {
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  await Post.findByIdAndDelete(_id);
  res.json({ message: "Post deleted" });
};

const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const post = await Post.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like a post
    post.likes.push(req.userId);
  } else {
    //dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  // const updatedPost = await Post.findByIdAndUpdate(_id, {$inc: {likeCount: 1}}, {new: true});
  const updatedPost = await Post.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

module.exports = { getPosts, createPost, updatePost, deletePost, likePost, getPostsByQuery };
