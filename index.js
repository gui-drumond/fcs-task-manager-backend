const express = require("express");
const dotenv = require("dotenv");
const connectToDataBase = require("./src/database/mongoose.database");
const TaskRouter = require("./src/routes/task.routes");

dotenv.config();
const app = express();
app.use(express.json());
connectToDataBase();

app.use("/tasks", TaskRouter);

app.listen("3000", () => {
    console.log("Rodando o servidor ");
});
