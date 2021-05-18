const databaseURL = 'books.database'

const express = require('express');
const server = express();
const parser = require('body-parser');

const cors = require('cors');



const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(databaseURL);

server.use(cors());
server.use(parser.json());

server.post('/books/', async(req, res) => {
    const book = req.body;
    const q = `insert into books ( "author", "title", "genre", "price") values ( "` + book.author + `", "` + book.title + `", "` + book.genre + `", "` + book.price + `"); `;
    const key = book.title;

    try {
    
        const rows = await query( 'SELECT * FROM books WHERE title="' + key + '" ;' );

        //check if the book title already exist in database
        if (rows.length === 0) {

            db.run(q, (err) => {
                if (err) {
                    conslole.log(err);
                    res.send('Error executing query')
                } else {
                    res.send('book added succesfully!');
                }
            });

        } else {
            res.send('This book already exist!');
        }
    } catch (err) {
        res.send('Error executing query')
    };
});

server.get('/books/:search', async(req, res) => {

    const key = req.params.search;

    // the search method return 2 dimensional array 
    var books = await search(key);

    // convert to 1 dimensional 
    for( var i = 0; i < books.length; i++) {
        books[i] = books[i][0];
    }

    try {
        
        if (books == 0) {
            res.send('This book dooes not exist!');
        } else {
            res.send(JSON.stringify(books));
        }
    } catch (err) {
        res.send('Error executing query')
    };

});

function query(q) {

    return new Promise((resolve, reject) => {
        db.all(q, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

async function search(key) {

    const row = await query('SELECT * FROM books ;');

    if (row === undefined) {
        return 0;
    }

    //convert all books to text
    var text = JSON.stringify(row);

    //convert text to array
    text = text.split('{');

    var books = new Array();

    for (var i = 0; i < text.length; i++) {

        
        text[i] = text[i].toUpperCase();

        //search if the books one by one if they includes the key
        if (text[i].includes(key.toUpperCase())) {

            try {

                // the index of book on the array is the id on the database
                // then retrieve this book from the db
                const book = await query('SELECT * FROM books WHERE id="' + i + '" ');
                books.push(book);

            } catch (err) {
                console.log(err);
            }
        }

    }

    return books;

}



server.listen(2020);

console.log('Server listening on port 2020');