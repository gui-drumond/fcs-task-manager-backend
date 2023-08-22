const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose
        .connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanagercluster.wao625t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        )
        .then((res) => console.log("Connected to MongoDB!"))
        .catch((error) => {
            if (error) {
                return console.log(
                    `Could not connect to MongoDB: ${error.message}`
                );
            }
        });
};

module.exports = connectToDatabase;
