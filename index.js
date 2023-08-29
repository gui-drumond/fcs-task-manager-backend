const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectToDataBase = require("./src/database/mongoose.database");
const TaskRouter = require("./src/routes/task.routes");

dotenv.config();
const app = express();
connectToDataBase();

app.use(express.json());
app.use(cors());
app.use("/tasks", TaskRouter);

app.listen("3000", () => {
    console.log("Rodando o servidor ");
});
