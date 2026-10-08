const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getAllUsers = async (delay = 0) => {
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  return await User.find().select("-password");
};

const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

const createUser = async (userData) => {
  const {
    userId,
    name,
    email,
    password,
    role,
    accessLevel,
    status
  } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userId,
    name,
    email,
    password: hashedPassword,
    role: role || "user",
    accessLevel: accessLevel || "limited",
    status: status || "active"
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
};

const updateUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(
    id,
    userData,
    {
      new: true,
      runValidators: true
    }
  ).select("-password");

  return user;
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};