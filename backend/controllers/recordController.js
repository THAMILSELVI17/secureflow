const recordService = require("../services/recordService");

const getRecords = async (req, res) => {
  try {
    const records = await recordService.getAllRecords(req.user);

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getRecord = async (req, res) => {
  try {
    const record = await recordService.getRecordById(
      req.params.id,
      req.user
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    if (record === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Access forbidden"
      });
    }

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getRecords,
  getRecord
};