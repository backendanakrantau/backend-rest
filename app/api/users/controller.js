const User = require("./model");
const { StatusCodes } = require("http-status-codes");
const CustomAPI = require("../../errors");
const cloudinary = require("cloudinary").v2;

const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find({ role: "user" }).sort({ createdAt: -1 });
    return res.status(StatusCodes.OK).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw new CustomAPI.NotFoundError("User not Found");
    }

    return res.status(StatusCodes.OK).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateInfoUser = async (req, res, next) => {
  try {
    const { userId: idUser } = req.user;
    const user = await User.findOne({ _id: idUser });

    if (!user) {
      throw new CustomAPI.NotFoundError("User not Found");
    }

    const { username } = req.body;

    user.username = username;

    // console.log("user >> ", user)
    const updatedUser = await User.findOneAndUpdate({ _id: idUser }, user);

    return res.status(StatusCodes.OK).json({
      message: "update user success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new CustomAPI.BadRequestError("User Not found to deleted");
    }

    await User.deleteOne({ _id: id });

    return res.status(StatusCodes.OK).json({
      message: "Delete Account Success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  getOneUser,
  updateInfoUser,
  deleteUser,
  
};
