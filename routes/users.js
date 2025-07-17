const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getCurrentUser,
  updateUser,
  createUser,
  loginUser,
} = require("../controllers/users");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, updateUser);

router.post("/signup", createUser);

router.post("/login", loginUser);

module.exports = router;
