
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,                          // Creates a unique index automatically
    match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    min: [0, "Age cannot be negative"],
    max: [120, "Age cannot exceed 120"],
  },
  hobbies: {
    type: [String],                        // Array of strings
    default: [],
  },
  bio: {
    type: String,                          // Used for full-text search
    default: "",
  },
  userId: {
    type: String,
    unique: true,
    default: () => uuidv4(),              // Auto-generate a unique ID
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,                         // TTL index: document auto-deletes after 3600 seconds (1 hour)
  },
});



// Hashed index on userId → good for equality lookups, used in sharded clusters
userSchema.index({ userId: "hashed" });

// Text index on bio → enables $text search queries
userSchema.index({ bio: "text" });

// (The unique: true on email and userId already created single-field unique indexes)
userSchema.index({ name: 1 });
userSchema.index({ email: 1, age: 1 });
userSchema.index({ hobbies: 1 });
const User = mongoose.model("User", userSchema);
module.exports = User;