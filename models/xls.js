const mongoose = require("mongoose");

const XlsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("XLS", XlsSchema);
