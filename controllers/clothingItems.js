const ClothingItem = require("../models/clothingItem");
const errors = require("../utils/errors");
const defaultClothingItems = require("../utils/defaultClothingItems");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(errors.CREATED_STATUS_CODE).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data" });
      } else {
        res
          .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      const allItems = [...defaultClothingItems, ...items];
      res.status(errors.OK_STATUS_CODE).send(allItems);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        return res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(errors.NOT_AUTHORIZED_STATUS_CODE)
          .send({ message: "ID does not match" });
      }
      return item.deleteOne().then(() => {
        res
          .status(errors.OK_STATUS_CODE)
          .send({ message: "Item successfully deleted" });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "No item with that ID exists" });
      } else if (err.name === "CastError") {
        res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID format" });
      } else {
        res
          .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
          .send({ message: "An error has occurred on the server" });
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
      if (err.name === "DocumentNotFoundError") {
        res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "No item with that ID exists" });
      } else if (err.name === "CastError") {
        res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID format" });
      } else {
        res
          .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
          .send({ message: "An error has occurred on the server" });
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
      if (err.name === "DocumentNotFoundError") {
        res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "No item with that ID exists" });
      } else if (err.name === "CastError") {
        res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID format" });
      } else {
        res
          .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
