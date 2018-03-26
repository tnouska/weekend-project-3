const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const todoRouter = require('./routes/todo.routes.js');
const mongoose = require('mongoose');
const databaseURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/hadar';
mongoose.connect(databaseURL);
mongoose.connection.on('connected', ()=>{
    console.log('connected to mongodb');
});

app.use('/todo', todoRouter);
app.use(express.static('server/public'));
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});


