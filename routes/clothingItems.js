const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  validateClothingItem,
  validateUserCreation,
  validateUserLogin,
  validateId,
} = require("../middleware/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", auth, validateClothingItem, createItem);

router.get("/", getItems);

router.delete("/:itemId", auth, validateId, deleteItem);

router.put("/:itemId/likes", auth, validateId, likeItem);

router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
