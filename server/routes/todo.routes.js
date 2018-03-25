//consts
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
    task: {type: String},
    location: {type: String},
    notes: {type: String},
    catagory: {type: String},
    completed: {type: Boolean}
});
const Todo = mongoose.model('Todo', todoSchema);

router.delete('/:id', (req,res)=>{
    let todoId = req.params.id
    Todo.findByIdAndRemove(todoId, (err, itemRemoved)=>{
        if (err) {
            console.log('error inside of todo.findbyidandremove: ', err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    })
})

router.get('/', (req,res)=>{
    Todo.find({}, (err, foundTask)=>{
        if (err) {
            console.log('error in router.get: ', err);
            res.sendStatus(500);
        }else{
            res.send(foundTask);
        }
    })
})
router.post('/', (req,res)=>{
    console.log('req.body inside of router.post: ', req.body);
    let taskObject = req.body
    let taskToAdd = new Todo(taskObject)
    taskToAdd.save((err, savedTask)=>{
        if (err) {
            console.log('error inside of taskToAdd.save: ', err);
            res.sendStatus(500);
        }else{
            console.log('the saved task: ', savedTask);
            res.sendStatus(200);
        }
    })
    
})
router.put('/:id', (req,res)=>{
    let taskId = req.params.id;
    let updates = req.body;
    Todo.findByIdAndUpdate(taskId,updates,{new: true},(err, updateItem)=>{
        if (err) {
            console.log('error inside of findbyidandupdate: ', err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    })
})

module.exports = router;
//end of file