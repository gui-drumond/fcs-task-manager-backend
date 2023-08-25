const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).createTasks();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTaskById();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).updateTaskById();
});

module.exports = router;
