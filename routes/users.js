const router = require("express").Router();
const auth = require("../middleware/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/users/me", auth, getCurrentUser);

router.patch("/users/me", auth, updateUser);

module.exports = router;
