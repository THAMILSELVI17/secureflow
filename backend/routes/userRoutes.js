const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getUsers
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getUser
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createUser
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;