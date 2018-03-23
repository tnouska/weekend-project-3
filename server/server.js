// requires and consts
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const todoRouter = require('./routes/todo.routes');
const databaseURL = 'mongodb://localhost:27017/hadar';
//app.uses
app.use(bodyParser.json());
app.use('/todo', todoRouter);
app.use(express.static('server/public'));
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
//mongoose
mongoose.connect(databaseURL);
mongoose.connection.on('connected', ()=>{
    console.log('connected to mongodb');
})

