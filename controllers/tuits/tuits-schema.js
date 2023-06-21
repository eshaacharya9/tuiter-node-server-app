import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  dislikes: Number,
  replies: Number,
  retuits: Number,
  liked: Boolean,
  topic: String,
  username: String,
  handle: String,
  title: String,
  time: String,
  image: {
    type: String,
    default: "profile.jpg"
  },
  disliked: Boolean
}, {collection: 'tuits'});
export default schema;