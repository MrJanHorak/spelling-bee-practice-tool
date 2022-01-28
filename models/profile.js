import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  confidentWords: {
    type: Array,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export { Profile };
