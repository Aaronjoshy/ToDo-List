const ToDoModel = require("../models/ToDoModel");

module.exports.getToDos = async (req, res) => {
  try {
    const toDos = await ToDoModel.find();
    res.status(200).json(toDos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.saveToDo = (req, res) => {
  const { toDo } = req.body;

  if (!toDo) {
    return res.status(400).json({ msg: "ToDo cannot be empty!" });
  }
  ToDoModel.create({ toDo, status: "Pending" })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message, msg: "Something went wrong!" });
    });
};

module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;

  ToDoModel.findByIdAndUpdate(id, { toDo }, { new: true })
    .then((updatedToDo) => {
      if (!updatedToDo) {
        return res.status(404).json({ msg: "ToDo not found!" });
      }
      res.json({ msg: "Updated Successfully!", updatedToDo });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message, msg: "Something went wrong!" });
    });
};

module.exports.updateToDoStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Ongoing", "Completed"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status!" });
    }
    const updatedToDo = await ToDoModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedToDo) {
      return res.status(404).json({ msg: "ToDo not found!" });
    }
    res.json({ msg: "Status updated successfully", updatedToDo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;
  ToDoModel.findByIdAndDelete(id)
    .then((deletedToDo) => {
      if (!deletedToDo) {
        return res.status(404).json({ msg: "ToDo not found!" });
      }
      res.json({ msg: "Deleted Successfully!" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message, msg: "Something went wrong!" });
    });
};