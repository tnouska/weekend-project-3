//consts
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    task: {type: String},
    location: {type: String},
    notes: {type: String},
    completed: {type: Boolean}
});
const Todo = mongoose.model('Todo', todoSchema);


module.exports = router;
//end of file