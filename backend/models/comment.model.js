import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema({
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, {
  timestamps: true
});

export default mongoose.model("Comment", commentSchema);
