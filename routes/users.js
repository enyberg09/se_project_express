const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getCurrentUser,
  updateUser,
 } = require("../controllers/users");

 const { validateUserUpdate } = require("../middleware/validation");


router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, validateUserUpdate, updateUser);

module.exports = router;
