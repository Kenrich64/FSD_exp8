// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  groupByAge,
  searchByName,     
  filterByEmailAndAge, 
  filterByHobby,       
} = require("../controllers/userController");


router.get("/search", searchUsers);             
router.get("/group-by-age", groupByAge);         
router.get("/by-name", searchByName);          
router.get("/filter", filterByEmailAndAge);     
router.get("/by-hobby", filterByHobby);          

// CRUD
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;