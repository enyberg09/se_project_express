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
    .catch((e) => {
      res
        .status(errors.NOT_FOUND_STATUS_CODE)
        .send({ message: "Error from createItem", e });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(errors.OK_STATUS_CODE).send(items))
    .catch((e) => {
      res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(errors.OK_STATUS_CODE).send({ data: item }))
    .catch((e) => {
      res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Error from updateItems", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(errors.UPDATED_STATUS_CODE).send({}))
    .catch((e) => {
      res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Error from deleteItem", e });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
