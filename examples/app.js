const express = require('express');
const app = express();
const parser = require('body-parser');

const cors = require('cors');



const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.sqlite');

app.use(cors());
app.use(parser.json());

app.get('/listUsers', async (req, res) => {
    const q = 'SELECT * FROM users';
    try {
        const rows = await query(q);
        res.send(JSON.stringify(rows));
    } catch(err) {
        res.send('Error executing query')
    }
});

app.get('/user/:id', async (req, res) => {
    const q = 'SELECT * FROM users where rowid='+ req.params.id + ' ;';
    try {
        const rows = await query(q);
        res.send(JSON.stringify(rows));
    } catch(err) {
        res.send('Error executing query')
    };
});

app.post('/addUser', (req, res) => {
    const user = req.body;
    const q = `insert into users ( "name", "password", "profession") values ( "` + user.name + `", "` + user.password +`", "` + user.profession + `"); `;
    
    console.log(q);
    db.run( q, ( err) => {
        if( err) {
            res.send('Error executing query')
        } else {
            res.send('All ok');
        }
    });
});

app.delete('/deleteUser', (req, res) => {
    
});

function query(q) {
    return new Promise( ( resolve, reject) => {
        db.all(q, ( err, rows) => {
            if( err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

app.listen('2020');
console.log('Server is running on port 2020');
