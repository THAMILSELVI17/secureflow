const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    const { userId, password, role } = req.body;

    if (!userId || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "User ID, password and role are required"
      });
    }

    const result = await authService.loginUser(
      userId,
      password,
      role
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  login
};