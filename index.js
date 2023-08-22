const express = require("express");
const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/mongoose.database");
dotenv.config();
const app = express();
app.use(express.json());
const TaskModel = require("./src/models/task.model");

connectToDataBase();
app.get("/tasks", async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks);
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen("3000", () => {
    console.log("Rodando o servidor ");
});
