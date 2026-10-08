const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = async (userId, password, role) => {
  const user = await User.findOne({ userId });

  if (!user) {
    throw new Error("Invalid user ID or password");
  }

  if (user.role !== role) {
    throw new Error("Invalid role for this user");
  }

  if (user.status !== "active") {
    throw new Error("User account is inactive");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid user ID or password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      userId: user.userId,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h"
    }
  );

  return {
    token,
    user: {
      id: user._id,
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
      accessLevel: user.accessLevel,
      status: user.status
    }
  };
};

module.exports = {
  loginUser
};