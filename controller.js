const {Book} = require('./models.js');

function addUser(id, author, title, genre, price ) {
    const book = new Book(id, author, title, genre, price);
    const request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:3000/addBook', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(book));
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            if(request.status == 200) {
                alert(request.responseText);
            }
        }
    }



} 