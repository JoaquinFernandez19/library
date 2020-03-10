//Hello
function Book(title, author, read, number) {
	this.title = title;
	this.author = author;
	this.read = read;
	this.number = number;
}

let library = [];

function createNewBook() {
	let book = new Book();
	book.title = formTitle.value;
	book.author = formAuthor.value;
	book.read = formRead.checked;
	if (book.title && book.author) {
		library.push(book);
	}
}
//Render every book on the screen
function render() {
	//function creadora de los elementos html y nodes
	//Limpio el html para que no se stacken los viejos
	libraryHTML.innerHTML = '';
	// Counter para los data-book
	let counter = 0;
	library.forEach((book) => {
		//Creo los elementos del libro
		let paragraph = document.createElement('p');
		let span = document.createElement('span');
		let spanDelete = document.createElement('span');
		let iconDelete = document.createElement('i');

		//Agrego classes a los elementos
		iconDelete.classList.add('fas', 'fa-ban');
		spanDelete.appendChild(iconDelete);
		spanDelete.classList.add('delete');

		//Creo un elemento que define si está leído o no
		let readItNode = document.createTextNode(`${book.read ? 'FINISHED' : 'UNFINISHED'}`);

		//Texto dentro del Paragraph
		let bookNode = document.createTextNode(`"${book.title}" writed by "${book.author}" `);
		//Insertamos el contenido del boton de leído o no leído
		span.appendChild(readItNode);
		if (span.textContent === 'UNFINISHED') {
			span.classList.add('read-NO');
		}
		if (span.textContent === 'FINISHED') {
			span.classList.add('read-YES');
		}
		//Insertamos el data-book en los spans
		spanDelete.dataset.book = counter;
		span.dataset.book = counter;

		//Aumentamos el counter para el siguiente libro
		counter++;

		//Insertamos el data-book numero en el objeto
		book.number = span.dataset.book;
		book.number = spanDelete.dataset.book;

		//Insertamos todo en el html
		paragraph.appendChild(spanDelete);
		paragraph.appendChild(bookNode);
		paragraph.appendChild(span);
		libraryHTML.appendChild(paragraph);
	});
}
//function to change the read status of a book
let readStatus = (e) => {
	let current = e.target;
	// First change the style of the read btn
	if (
		current.hasAttribute('data-book') &&
		(current.classList.contains('read-NO') || current.classList.contains('read-YES'))
	) {
		current.classList.toggle('read-NO');
		current.classList.toggle('read-YES');

		// Then change the value of read
		library.forEach((book) => {
			let currentBookObj = book;
			if (currentBookObj.number === current.dataset.book && currentBookObj.read) {
				currentBookObj.read = false;
			} else if (currentBookObj.number === current.dataset.book && !currentBookObj.read) {
				currentBookObj.read = true;
			}
		});

		//Update the html
		render();
	}
};

let deleteBook = (e) => {
	let current = e.target.parentElement;
	if (current.classList.contains('delete') && current.hasAttribute('data-book')) {
		library.forEach((book) => {
			let currentBookObj = book;
			if (currentBookObj.number === current.dataset.book) {
				let indexToDelete = library.indexOf(currentBookObj);
				library.splice(indexToDelete, 1);

				render();
			}
		});
	}
};

//html elements
let libraryHTML = document.querySelector('#library-html');
let addBookBtn = document.querySelector('.newBook');
let readStatusBtn = document.querySelector('span');

//Form html elements
let form = document.querySelector('.form');
let submitBtn = document.querySelector('.submitBtn');
let formTitle = document.getElementById('title');
let formAuthor = document.getElementById('author');
let formRead = document.querySelector('#read');
let closeForm = document.querySelector('.close');

//Eventlisteners

submitBtn.addEventListener('click', (e) => {
	if (formTitle.value !== '' && formAuthor.value !== '') {
		form.style.display = 'none';
		createNewBook();
		render();
	}

	formTitle.value = '';
	formAuthor.value = '';
});

closeForm.addEventListener('click', () => {
	form.style.display = 'none';
	formTitle.value = '';
	formAuthor.value = '';

	formRead.value = '';
});

addBookBtn.addEventListener('click', () => {
	form.style.display = 'flex';
});

window.addEventListener('click', deleteBook);
window.addEventListener('click', readStatus);
