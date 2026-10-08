const mongoose = require("mongoose");
require("dotenv").config();

const Record = require("./models/Record");

const seedRecords = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Record.deleteMany({});

    const records = [
      {
        recordId: "REC001",
        title: "Student Profile",
        description: "Student academic and profile information",
        ownerId: "admin001",
        accessLevel: "full",
        status: "active"
      },
      {
        recordId: "REC002",
        title: "Career Assessment",
        description: "Career assessment and recommendation record",
        ownerId: "user001",
        accessLevel: "limited",
        status: "active"
      },
      {
        recordId: "REC003",
        title: "Skill Assessment",
        description: "Technical and professional skill assessment",
        ownerId: "user002",
        accessLevel: "limited",
        status: "pending"
      },
      {
        recordId: "REC004",
        title: "System Audit",
        description: "Administrative system audit record",
        ownerId: "admin001",
        accessLevel: "full",
        status: "archived"
      },
      {
        recordId: "REC005",
        title: "Learning Progress",
        description: "Student learning progress information",
        ownerId: "user001",
        accessLevel: "limited",
        status: "active"
      }
    ];

    await Record.insertMany(records);

    console.log("Demo records created successfully");

    await mongoose.disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding records failed:", error.message);
    process.exit(1);
  }
};

seedRecords();