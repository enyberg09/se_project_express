const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  InternalError,
} = require("../errors");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new BadRequestError("The password and email fields are required"));
  }
  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    if (err instanceof UnauthorizedError) {
      return next(new UnauthorizedError("Invalid data provided for user login"));
    }
    return next(new InternalError("An error has occurred on the server"));
  }
};

const createUser = async (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      avatar,
      email,
      password,
    });
    return res.status(201).send({
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return next(
        new ConflictError
      ("A user with that email already exists. Please use a different email."));
    }
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data provided for user creation"));
    }
    return next(new InternalError("An error has occurred on the server"));
  }
};

const getCurrentUser = async (req, res, next) => {
  const { _id: userId } = req.user;
    try {
    const user = await User.findById(userId).orFail();
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("No user with that ID exists"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid user ID format"));
    }
    return next(new InternalError("An error has occurred on the server"));
  }
};

const updateUser = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, avatar } = req.body;
 
    try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true, runValidators: true }
    ).orFail();

     return res.status(200).send(user);
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("No user with that ID exists"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid user ID format"));
    }
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Failed to update User"));
    }
    return next(new InternalError("An error has occurred on the server"));
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  loginUser,
  updateUser,
};
