const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  action: {
    type: String,
    required: [true, "The todo text field is required"],
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
