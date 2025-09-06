import { Schema } from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema({
  cover: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  desc: { type: String },
  category: {type: String, default: 'general'},
  slug: { type: String, required: true, unique: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  featured: { type: Boolean, default: false },
  visits: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model("Post", postSchema);
