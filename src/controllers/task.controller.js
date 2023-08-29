const TaskModel = require("../models/task.model");
const { notFoundError, objectIdError } = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateErros } = require("../errors/general.errors");
const { default: mongoose } = require("mongoose");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async createTasks() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async deleteTaskById() {
        try {
            const { id } = this.req.params;

            const taskToDelete = await TaskModel.findById(id);

            if (!taskToDelete) {
                return notFoundError(this.res);
            }
            const deletedTask = await TaskModel.findByIdAndDelete(id);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }
    async getTaskById() {
        try {
            const { id } = this.req.params;

            const task = await TaskModel.findById(id);

            if (!task) {
                return notFoundError(this.res);
            }
            this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }
    async updateTaskById() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;
            const allowedUpdates = ["isCompleted"];
            const requestedUpdates = Object.keys(taskData);

            for (const update of requestedUpdates) {
                if (!allowedUpdates.includes(update)) {
                    return notAllowedFieldsToUpdateErros(this.res);
                }
            }
            const updataTask = await TaskModel.findOneAndUpdate(
                { _id: taskId },
                taskData,
                {
                    returnOriginal: false,
                }
            );

            this.res.status(200).send(updataTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
