const { Router } = require("express");
const {getToDos,saveToDo,updateToDo,deleteToDo,updateToDoStatus} = require("../controllers/ToDoController");

const router = Router();

router.get("/get", getToDos);
router.post("/save", saveToDo);
router.put("/update/:id", updateToDo);
router.put("/update-status/:id", updateToDoStatus);
router.delete("/delete/:id", deleteToDo);

module.exports = router;