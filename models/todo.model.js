const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
    id: String,
    title: String,
    finished: Boolean,
}, {timestamps: true});

module.exports = mongoose.model("Todo", Todo);
