const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await User.deleteMany({});

    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const userPassword = await bcrypt.hash("User@123", 10);

    const users = [
      {
        userId: "admin001",
        name: "SecureFlow Admin",
        email: "admin@secureflow.com",
        password: adminPassword,
        role: "admin",
        accessLevel: "full",
        status: "active"
      },
      {
        userId: "user001",
        name: "General User",
        email: "user@secureflow.com",
        password: userPassword,
        role: "user",
        accessLevel: "limited",
        status: "active"
      },
      {
        userId: "user002",
        name: "Priya User",
        email: "priya@secureflow.com",
        password: userPassword,
        role: "user",
        accessLevel: "limited",
        status: "active"
      }
    ];

    await User.insertMany(users);

    console.log("Demo users created successfully");

    await mongoose.disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedUsers();