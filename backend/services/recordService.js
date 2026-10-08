const Record = require("../models/Record");

const getAllRecords = async (user) => {
  let records;

  if (user.role === "admin") {
    records = await Record.find();
  } else {
    records = await Record.find({
      $or: [
        { ownerId: user.userId },
        { accessLevel: "limited" }
      ]
    });
  }

  return records;
};

const getRecordById = async (id, user) => {
  const record = await Record.findById(id);

  if (!record) {
    return null;
  }

  if (user.role === "admin") {
    return record;
  }

  if (
    record.ownerId === user.userId ||
    record.accessLevel === "limited"
  ) {
    return record;
  }

  return "FORBIDDEN";
};

module.exports = {
  getAllRecords,
  getRecordById
};