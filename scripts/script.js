// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara_1 = document.createElement('p');
const footerPara_2 = document.createElement('p');
const a = document.createElement('a');
a.href = "https://github.com/luizerkp";
const githubLogo = document.createElement('img');
githubLogo.src="imgs/GitHubMarkSmall.png"
a.appendChild(githubLogo)
a.setAttribute('id', 'github-log');
const date = new Date().getFullYear();
footerPara_1.textContent = `Copyright © ${date} Luis Tamarez`
footerPara_2.textContent = "All Rights Reserved";
footer.appendChild(footerPara_1);
footer.appendChild(a);
footer.appendChild(footerPara_2)

let bookLibrary = [];
console.log(bookLibrary);
const showAddBookForm = document.querySelector("#showAddBook");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button")

showAddBookForm.addEventListener('click', () => {
    modal.classList.add("show-modal");

    closeButton.addEventListener('click', () => {
        modal.classList.remove("show-modal");
    });
});

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Logic for addBook modal ////////////////////////////////

const bookForm = document.querySelector('#book-form');
const inputs = document.querySelectorAll('input');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const notRead = document.querySelector('#not-read');

read.addEventListener('click', (event) => {
    checkboxHandler(event);
});
notRead.addEventListener('click', (event) => {
    checkboxHandler(event);
});

// focus and blur events
inputs.forEach(input => {
    input.addEventListener('focus', () => {    
        if(!input.classList.contains('no-focus')){
        input.classList.add('input-focus');
        }
    });

    input.addEventListener('blur', () => {
        input.classList.remove('input-focus');
    });
});

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    info (){
    return `"${this.title} by ${this.author}, ${this.pages + " pages"}, ${this.read}"`;
    } 
}; 

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    modal.classList.remove("show-modal");
});

function addBookToLibrary() {
    let bookReadStatus = read.checked === true ? 'read' : 'not read yet';
    let book = new Book(title.value, author.value, pages.value, bookReadStatus);
    bookLibrary.push(book);
    // console.log(book.info());
    buildBookDisplay(book);
}

function checkboxHandler(event) {
    if(event.target.id === 'read') {
        read.checked = true;
        notRead.checked = false;
    } else {
        read.checked = false;
        notRead.checked = true;
    }
}    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Logic for index.html non-modal content /////////////////////////////////////////////////////

const sampleCard = document.getElementById("sample");

// build card display... still need to complete
function buildBookDisplay(book){
    // get card container
    const cardContainer = document.getElementById("cards");

    // clone sample card
    const bookCard = sampleCard.cloneNode(true); 

    // remove id attribute from cloned Node
    bookCard.removeAttribute("id")

    // Update the first 3 children nodes' text content
    bookCard.children[0].textContent = book.title;
    bookCard.children[1].textContent = book.author;
    bookCard.children[2].textContent = book.pages + " " + "pages";

    // console.log(
    //     bookCard.children[0].textContent = book.title,
    //     bookCard.children[1].textContent = book.author,
    //     bookCard.children[2].textContent = book.pages + " " + "pages"
    // );
    cardContainer.appendChild(bookCard);

    // if sample card is displayed hide it
    if (!sampleCard.classList.contains("hide")) {
        sampleCard.classList.add("hide");
    }
}    


