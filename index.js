const express = require("express");
const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDataBase();
app.get("/", (req, res) => {
    res.status(200).send("hello World");
});

app.listen("3000", () => {
    console.log("Rodando o servidor ");
});
