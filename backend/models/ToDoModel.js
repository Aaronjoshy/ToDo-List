const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    toDo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Ongoing", "Completed"],
      default: "Pending",
    }
  });

module.exports = mongoose.model('ToDo', todoSchema)