import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: { type: String, required: true},
  likes: Number,
  liked: Boolean,
  topic: String,
  username: String,
  title: String,
  time: String,
  image: String,
  dislikes: Number,
  disliked: Boolean,
  replies: Number,
  retuits: Number,
  handle: String
}, {collection: 'tuits'});
export default schema;