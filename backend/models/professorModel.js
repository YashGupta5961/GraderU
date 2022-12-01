const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
});

const Professor = mongoose.model("Professor", professorSchema);

module.exports = Professor;
