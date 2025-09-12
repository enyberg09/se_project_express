const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  InternalError,
} = require("../errors");
const defaultClothingItems = require("../utils/defaultClothingItems");

const createItem = async (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  try {
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    return res.status(201).send({ data: item });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data provided for clothing item creation"));
    }
    return next(new InternalError("An error has occurred on the server"));
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    return res.status(200).send([...defaultClothingItems, ...items]);
  } catch (err) {
    console.error(err);
    return next(new InternalError("An error has occurred on the server"));
  }
};

const deleteItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await ClothingItem.findById(itemId).orFail();

    if (item.owner.toString() !== req.user._id) {
      return next(new ForbiddenError("You are not authorized to delete this item"));
    }

    await item.deleteOne();
    return res.status(200).send({ message: "Item successfully deleted" });
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("No item with that ID exists"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID format"));
    }
    return next(new InternalError("An error has occurred on the server"));
  }
};

const likeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail();

    return res.status(200).send({ data: item });
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("No item with that ID exists"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID format"));
    }
    return next(new InternalError("An error has occurred on the server"));
  }
};

const dislikeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail();

    return res.status(200).send({ data: item });
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("No item with that ID exists"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID format"));
    }
    return next(new InternalError("An error has occurred on the server"));
  }
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
