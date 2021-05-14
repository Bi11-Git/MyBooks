const databaseURL = 'books.database'

const express = require('express');
const server = express();
const parser = require('body-parser');

const cors = require('cors');



const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(databaseURL);

server.use(cors());
server.use(parser.json());

server.get('/:search', (req, res) => {

    const q = 'SELECT * FROM books WHERE author="' +req.params.search +'" or title="' + req.params.search + '" or genre="' + req.params.search + '" ;';
    db.all(q, ( err, rows) => {
        if( err) {
            console.log(err);
        } else {
            res.send(JSON.stringify(rows));
        }
    })

});

server.get('/', (req, res) => {

    const q = 'SELECT * FROM books;';
    db.all(q, ( err, rows) => {
        if( err) {
            console.log(err);
        } else {
            res.send(JSON.stringify(rows));
        }
    })

});

server.post('/', (req, res) => {
    const book = new Book(req.body)
    const q = `insert into books ( "author", "title", "genre", "price") values ( "` + book.author + `", "` + book.title + `", "` + book.genre +`", "` + book.price + `"); `;
    console.log(q);
    db.run( q, ( err) => {
        if( err) {
            res.send('Error executing query')
        } else {
            res.send('All ok');
        }
    });
});

server.listen(2020);

console.log('Server listening on port 2020');