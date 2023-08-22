const { model, Schema, default: mongoose } = require("mongoose");

const TaskSchema = Schema({
    description: {
        type: String,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
