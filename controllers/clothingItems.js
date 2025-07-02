const ClothingItem = require("../models/clothingItem");
const errors = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(errors.CREATED_STATUS_CODE).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(errors.BAD_REQUEST_STATUS_CODE)
        .send({ message: "Invalid data" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(errors.OK_STATUS_CODE).send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(errors.OK_STATUS_CODE).send({ data: item }))
    .catch((err) => {
      console.error(err);
      res
        .status(errors.NOT_FOUND_STATUS_CODE)
        .send({ message: "Item not found" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(errors.OK_STATUS_CODE).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Item not found" });
      } else {
        res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(errors.OK_STATUS_CODE).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Item not found" });
      } else {
        res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(errors.OK_STATUS_CODE).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Item not found" });
      } else {
        res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
