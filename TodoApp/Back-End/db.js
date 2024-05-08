const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://admin:Pukn06YSZYJS8Iih@cluster0.8ksegeq.mongodb.net/todos")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}