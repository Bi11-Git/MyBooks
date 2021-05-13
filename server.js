const express = require('express');
const parser = require('body-parser');
//const mysql = require('mysql');
const {Book} = require('./models.js');

const server = express();

server.get('/', (req, res) => {
    res.end('Not yet implemented');
});

server.post('/addBook', (req, res) => {
    console.log(req.body);
    const book = req.body;

    // add to database 
    //data.push(book);
    
    res.send('All ok');
});

server.listen(3000);

console.log('Server listening on port 3000');