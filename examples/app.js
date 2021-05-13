const data = require('./data.js');
const express = require('express');
const app = express();

const parser = require('body-parser');
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.get('/listUsers', (req, res) => {
    res.send(JSON.stringify(data));
});

app.get('/:id', (req, res) => {
    
});

app.post('/', (req, res) => {
    console.log(req.body);
    console.log('request!!!');
    const user = req.body;
    data.push(user);
    res.send('All ok');
});

app.delete('/deleteUser', (req, res) => {
    
});

app.listen('3000');
console.log('Server is running on port 3000');
