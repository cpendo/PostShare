const mongoose = require("mongoose");
const schema = mongoose.Schema;

const post = new schema({
  title: String,
  message: String,
  creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: []
  }
}, {timestamps: true});

const Post = mongoose.model('Posts', post);

module.exports = Post;
