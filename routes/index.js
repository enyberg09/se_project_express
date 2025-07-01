const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const errors = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res
    .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
    .send({ message: "Router not found" });
});

module.exports = router;
