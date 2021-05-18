class Book {

    constructor(id, author, title, genre, price) {

        this.id = id;
        this.author = author;
        this.title = title;
        this.genre = genre;
        this.price = price;
    }

}

window.addEventListener('load', (event) => {
    document.getElementById("addBook").addEventListener('click', (event) => {

        document.getElementById('price').setCustomValidity('');

        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const genre = document.getElementById('genre').value;
        const price = document.getElementById('price').value;

        if(isNaN(price)) {

            document.getElementById('price').setCustomValidity('Not a number!');

            return;
        }

        if (author == "" || title == "" || genre == "" || price == "") {
            return;
        }

        const book = new Book(0, author, title, genre, price);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:2020/books/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(book));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert(xhr.responseText);
                }
            }
        }

        return false;

    });

});

window.addEventListener('load', (event) => {
    document.getElementById("search").addEventListener('click', (event) => {

        const key = document.getElementById('key').value;

        if (key == "") {
            return;
        }

        var table = document.getElementById("table");
        //or use :  var table = document.all.tableid;

        for (var i = table.rows.length - 1; i > 0; i--) {
            table.deleteRow(i);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:2020/books/' + key, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {

                    var results;
                    try {
                        results = JSON.parse(xhr.responseText);
                    } catch (err) {
                        alert('This book doesnt exist!');
                        return;
                    }

                    for (var i = 0; i < results.length; i++) {
                        print(results[i]);
                    }

                }
            }
        };

    });

});

function print(item) {

    if (item === undefined) {
        alert('aaaaaa');
        return;
    }


    const table = document.getElementById('table');

    const row = table.insertRow();

    const idCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const titleCell = row.insertCell(2);
    const genreCell = row.insertCell(3);
    const priceCell = row.insertCell(3);

    idCell.innerHTML = item.id;
    authorCell.innerHTML = item.author;
    titleCell.innerHTML = item.title;
    genreCell.innerHTML = item.genre;
    priceCell.innerHTML = item.price;

}