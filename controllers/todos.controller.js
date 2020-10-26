const express = require("express");
const router = express.Router();
const db = require("./../services/todos.service");

router.get("/", db.getTodos);
router.put("/:id", db.toggleTodo);
router.post("/", db.addTodo);
router.delete("/:id", db.deleteTodo);

module.exports = router;
