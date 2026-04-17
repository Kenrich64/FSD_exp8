// controllers/userController.js
const User = require("../models/User");


exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);   
    await user.save();                 
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    
    res.status(400).json({ success: false, error: err.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    // if explain=true → show index usage
    if (req.query.explain === "true") {
      const result = await User.find({ email: req.query.email })
                               .explain("executionStats");
      return res.json(result);
    }

    // normal case
    const users = await User.find();
    console.log("Total users found:", users.length);
    res.status(200).json({ 
      success: true, 
      totalUsers: users.length, 
      data: users,
      message: users.length === 0 ? "No users found in database" : "Users retrieved successfully"
    });

  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─────────────────────────────────────────────
// TEXT SEARCH — GET /api/users/search?q=developer
// Uses the text index on `bio` to search.
// 
// ─────────────────────────────────────────────
// Text search on bio — GET /api/users/search?q=developer
exports.searchUsers = async (req, res) => {
  try {
    const users = await User.find({ $text: { $search: req.query.q } });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Search by name — GET /api/users/by-name?name=John
exports.searchByName = async (req, res) => {
  try {
    const users = await User.find({ name: req.query.name });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Filter by email and age — GET /api/users/filter?email=x@x.com&age=25
exports.filterByEmailAndAge = async (req, res) => {
  try {
    const users = await User.find({ 
      email: req.query.email, 
      age: Number(req.query.age) 
    });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Filter by hobby — GET /api/users/by-hobby?hobby=reading
exports.filterByHobby = async (req, res) => {
  try {
    const users = await User.find({ hobbies: req.query.hobby });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─────────────────────────────────────────────
// AGGREGATION — GET /api/users/group-by-age
// Groups users by age and counts how many per age.
// ─────────────────────────────────────────────
exports.groupByAge = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$age",              // Group documents by the `age` field
          totalUsers: { $sum: 1 }, // Count users in each group
        },
      },
      { $sort: { _id: 1 } },       // Sort by age ascending
    ]);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};