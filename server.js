const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongo = require("./databases/mongodb");
const todoController = require("./controllers/todos.controller");
const port = process.env.PORT || 3000;

mongo.connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/", (request, response) => {
    response.json("Todolist API");
});

app.use("/todos", todoController);

app.listen(port, () => {
    console.log(`App running on ` + port + " port!");
});
