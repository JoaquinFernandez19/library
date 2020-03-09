//Hello
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

//html elements
let libraryHTML = document.querySelector('#library-html');
let addBookBtn = document.querySelector('.newBook');

let library = [];

function createNewBook() {
	let book = new Book();
	book.title = prompt('Please enter the title of the book');
	book.author = prompt('Who writed it?');
	book.pages = prompt('What is the number of pages of this book?');
	book.read = confirm('Have you read it?');
	if (book.title && book.pages && book.author) {
		library.push(book);
		render();
	}
}

addBookBtn.addEventListener('click', createNewBook);

function render() {
	libraryHTML.innerHTML = '';
	library.forEach((book) => {
		let paragraph = document.createElement('p');
		let span = document.createElement('span');
		let readItNode = document.createTextNode(`${book.read ? 'READED' : 'UNREADED'}`);
		let bookNode = document.createTextNode(
			`"${book.title}" writed by "${book.author}", ${book.pages} pages `
		);

		//agreagarle el currentBook
		span.appendChild(readItNode);
		if (span.textContent === 'UNREADED') {
			span.classList.add('read-NO');
		}
		if (span.textContent === 'READED') {
			span.classList.add('read-YES');
		}
		paragraph.appendChild(bookNode);
		//agregrlo a libraryHTML'
		paragraph.appendChild(span);
		libraryHTML.appendChild(paragraph);
	});
}
