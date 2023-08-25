const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const taskToDelete = await TaskModel.findById(id);

        if (!taskToDelete) {
            res.status(404).send("Essa tarefa não foi encontrada!");
        }
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const task = await TaskModel.findById(id);

        if (!task) {
            res.status(404).send("Essa tarefa não foi encontrada!");
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const allowedUpdates = ["isCompleted"];
        const requestedUpdates = Object.keys(taskData);

        for (update of requestedUpdates) {
            if (!allowedUpdates.includes(update)) {
                return res
                    .status(500)
                    .send(
                        `O campo "${update}" ou mais campos inseridos não são editáveis! `
                    );
            }
        }
        const updataTask = await TaskModel.findOneAndUpdate(
            { _id: taskId },
            taskData,
            {
                returnOriginal: false,
            }
        );

        res.status(200).send(updataTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
