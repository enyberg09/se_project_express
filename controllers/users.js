const jwt = require("jsonwebtoken");
const User = require("../models/user");
const errors = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(errors.BAD_REQUEST_STATUS_CODE)
      .send({ message: "The password and email fields are required" });
  }
  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(errors.OK_STATUS_CODE).send({
      token,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    console.error(err);
    if (err.message === "Incorrect email or password") {
      return res
        .status(errors.UNAUTHORIZED_STATUS_CODE)
        .send({ message: "Invalid data provided for user login" });
    }
    return res
      .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
      .send({ message: "An error has occurred on the server" });
  }
};

const createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      avatar,
      email,
      password,
    });
    return res.status(errors.CREATED_STATUS_CODE).send({
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(errors.DUPLICATE_CONFLICT_STATUS_CODE).send({
        message:
          "A user with that email already exists. Please use a different email.",
      });
    }
    if (err.name === "ValidationError") {
      return res
        .status(errors.BAD_REQUEST_STATUS_CODE)
        .send({ message: "Invalid data provided for user creation" });
    }
    return res
      .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
      .send({ message: "An error has occurred on the server" });
  }
};

const getCurrentUser = (req, res) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(errors.OK_STATUS_CODE).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "No item with that ID exists" });
      }
      if (err.name === "CastError") {
        return res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID format" });
      }
      return res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateUser = (req, res) => {
  const { _id: userId } = req.user;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.status(errors.OK_STATUS_CODE).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(errors.NOT_FOUND_STATUS_CODE)
          .send({ message: "No item with that ID exists" });
      }
      if (err.name === "CastError") {
        return res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID format" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(errors.BAD_REQUEST_STATUS_CODE)
          .send({ message: "Failed to update User" });
      }
      return res
        .status(errors.INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  loginUser,
  updateUser,
};
