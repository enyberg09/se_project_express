const ClothingItem = require("../models/clothingItem");
const errors = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(errors.NOT_FOUND_STATUS_CODE)
        .send({ message: "Error creating item" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(errors.OK_STATUS_CODE).send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Item not found" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(errors.OK_STATUS_CODE).send({ data: item }))
    .catch((err) => {
      console.error(err);
      res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Error updating item" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(errors.UPDATED_STATUS_CODE).send())
    .catch((err) => {
      console.error(err);
      res
        .status(errors.NOT_FOUND_STATUS_CODE)
        .send({ message: "Error deleting item" });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
