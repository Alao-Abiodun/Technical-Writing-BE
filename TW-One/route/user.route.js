const express = require("express");
const router = express.Router();
// const { validateUserToken } = require("../../middleware/validation");

const {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
} = require("../controllers/user.controller");

// USER

// create user
router.post("/create", createUser);

// login
router.get("/user", getUser);

// get single user
router.get("/retrieve/:id", getSingleUser);

// update a user
router.put("/update/:id", updateUser);

module.exports = router;
