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

        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const genre = document.getElementById('genre').value;
        const price = document.getElementById('price').value;

        const book = new Book(0, author, title, genre, price);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:2020', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(book));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert(xhr.responseText);
                }
            }
        }

    });

});

window.addEventListener('load', (event) => {
    document.getElementById("search").addEventListener('click', (event) => {

        const key = document.getElementById('key').value;

        if(key == "") {
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:2020/' + key, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    const table = document.getElementById('table');
                    const results = JSON.parse(xhr.responseText);
                    const item = results[0];

                    if (item === undefined) {
                        alert('This book doesnt exist!');
                    } else {

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

                }
            }
        };

    });

});