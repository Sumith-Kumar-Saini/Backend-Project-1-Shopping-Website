const { log, clear, error } = require('console');

const cookieParser = require('cookie-parser');
const path = require('path');

const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", 'ejs');

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.listen(port, function(){
    clear(); // clearing the console
    log(`Server is listening on port ${port}`); // Server is listening on port 3000
});