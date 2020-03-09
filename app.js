//Hello
function Book(title, author, pages, read, number) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.number = number;
}

let library = [];

function createNewBook() {
	let book = new Book();
	book.title = prompt('Please enter the title of the book');
	book.author = prompt('Who writed it?');
	book.pages = prompt(
		"What is the number of pages of this book? (put 0 if you don't remember)"
	);
	book.read = confirm('Have you read it?');
	if (book.title && book.pages && book.author) {
		library.push(book);
		render();
	}
}

function render() {
	//Limpio el html para que no se stacken los viejos
	libraryHTML.innerHTML = '';
	// Counter para los data-book
	let counter = 0;
	library.forEach((book) => {
		//Creo los elementos del libro
		let paragraph = document.createElement('p');
		let span = document.createElement('span');

		//let iconDelete = document.createElement('i');
		//<i class="fas fa-trash-alt"></i>

		//Creo un elemento que define si está leído o no
		let readItNode = document.createTextNode(`${book.read ? 'READED' : 'UNREADED'}`);
		//Texto dentro del elemento creado
		let bookNode = document.createTextNode(
			`"${book.title}" writed by "${book.author}", ${
				book.pages === '0' ? 'uknown' : book.pages
			} pages `
		);
		//Insertamos el contenido del boton de leído o no leído
		span.appendChild(readItNode);
		if (span.textContent === 'UNREADED') {
			span.classList.add('read-NO');
		}
		if (span.textContent === 'READED') {
			span.classList.add('read-YES');
		}
		//Insertamos el data-book en el html
		span.dataset.book = counter;
		counter++;
		//Insertamos el data-book en el objeto
		book.number = span.dataset.book;
		//Insertamos todo en el html
		paragraph.appendChild(bookNode);
		paragraph.appendChild(span);
		libraryHTML.appendChild(paragraph);
	});
}

let readStatus = (e) => {
	let current = e.target;
	console.log(current.dataset.book);
	// First change the style of the read btn
	if (current.hasAttribute('data-book')) {
		current.classList.toggle('read-NO');
		current.classList.toggle('read-YES');

		// Then change the value of read
		library.forEach((book) => {
			let currentBookObj = book;
			if (currentBookObj.number === current.dataset.book && currentBookObj.read) {
				console.log('works!');
				currentBookObj.read = false;
			} else if (currentBookObj.number === current.dataset.book && !currentBookObj.read) {
				currentBookObj.read = true;
			}
		});

		//Update the html
		render();
	}

	//Now change the property in the object
};

//html elements

let libraryHTML = document.querySelector('#library-html');
let addBookBtn = document.querySelector('.newBook');
let readStatusBtn = document.querySelector('span');

//Eventlisteners

addBookBtn.addEventListener('click', createNewBook);

window.addEventListener('click', readStatus);
