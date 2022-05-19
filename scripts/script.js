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

const showAddBookForm = document.querySelector("#showAddBook");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button")
const addSymbol = document.getElementById("plus");
const sampleCard = document.getElementById("sample");

showAddBookForm.addEventListener('click', () => {
    modal.classList.add("show-modal");

    closeButton.addEventListener('click', () => {
        modal.classList.remove("show-modal");
    });
});

addSymbol.addEventListener('click', () => {
    showAddBookForm.click();
});

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Logic for addBook modal ////////////////////////////////

const bookForm = document.querySelector('#book-form');
const modalInputs = document.querySelectorAll('.modal-input');
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
modalInputs.forEach(input => {
    input.addEventListener('focus', () => {    
        input.classList.add('input-focus');
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

// build sample books
const lotr = new Book("The Fellowship of the Ring", "JRR Tolkien", "423", "read");
const theWayOfKings = new Book("The Way of Kings", "Brandon Sanderson", "1007", "read");
const theEyeOfTheWorld = new Book("The Eye of the World", "Robert Jordan", "782", "read");
const unsouled = new Book("Unsouled", "Will Wight", "292", "read");
const stormFront = new Book("Storm Front", "Jim Butcher", "322", "read");
const longBookTitle = new Book("No Matter How Much You Promise to Cook or Pay the Rent You Blew It Cauze Bill Bailey Ain’t Never Coming Home Again", "Bill Bailey", "638", "not read yet");
const longAuthorName =  new Book("Dymer", "Clive Hamilton, N. W. Clerk", "107", "not read yet");

// push sample books to bookLibrary array
bookLibrary.push(longBookTitle, longAuthorName, theWayOfKings, theEyeOfTheWorld, unsouled, stormFront, lotr);

const selectIconsFunctions = {
    'favorite': addToFavorite,
    "read": toggleRead,
    "queue": toggleQueue,
    "delete": deleteBook
}


if (bookLibrary.length > 0) {
    bookLibrary.forEach((book) => {
        buildBookDisplay(book);
    });
}

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

// build card display... still need to complete
function buildBookDisplay(book){
    // get card container
    const cardContainer = document.getElementById("cards");

    // clone sample card
    const bookCard = sampleCard.cloneNode(true); 

    // remove id attribute from cloned Node
    bookCard.removeAttribute("id");

    // Remove plus symbol which is the first child of sample card that was cloned
    bookCard.removeChild(bookCard.children[0]);


    // Update the first 3 children nodes' text content
    // Since first child was removed now .children[0] is the book title child element
    // truncate title if it is too long and add ellipsis with a tooltip
    if (book.title.length > 25) {
        bookCard.children[0].textContent = book.title.slice(0, 25) + "...";
        bookCard.children[0].dataset.title = book.title;
    } else {
        bookCard.children[0].textContent = book.title;
    }

    // truncate author if it is too long and add ellipsis with a tooltip
    if (book.author.length > 17) {
        bookCard.children[2].textContent = book.author.slice(0, 20) + "...";
        bookCard.children[2].dataset.title = book.author;
    } else {
        bookCard.children[2].textContent = book.author;
    }

    bookCard.children[3].textContent = book.pages + " " + "pages";

    // Add class to icons
    for (let i = 0; i < bookCard.children[4].children.length; i++){
        bookCard.children[4].children[i].classList.add("icon-list");
    }

    if(book.read === 'read') {
        bookCard.children[4].children[1].src = "./imgs/check-green.png";
    }

    cardContainer.prepend(bookCard);
}    

const selectIcons = document.querySelectorAll(".icon-list")

selectIcons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        selectIconsFunctions[event.target.name](event);
    });
});

function addToFavorite(event) {
    if(event.target.id === 'favorited') {
        event.target.src = "./imgs/heart-plus-outline.png";
        event.target.removeAttribute("id");
    } else {
        event.target.src = "./imgs/heart-red.png";
        event.target.setAttribute("id", "favorited");
    }
}

function toggleRead(event) {
    if(event.target.id === 'complete') {
        event.target.src = "./imgs/check-outline.png";
        event.target.removeAttribute("id");
    } else {
        event.target.src = "./imgs/check-green.png"; 
        event.target.setAttribute("id", "complete");
    }
}

function toggleQueue(event) {
    if(event.target.id === 'queued') {
        event.target.src = "./imgs/file-document-plus-outline.png";
        event.target.removeAttribute("id");
    } else {
        event.target.src = "./imgs/file-document-multiple.svg";
        event.target.setAttribute("id", "queued");
    }
}

function deleteBook(event) {
    //trying to delete book from library
    // bookLibrary.splice(bookLibrary.indexOf(event.target.parentNode.parentNode), 1);
    event.target.parentElement.parentElement.remove();
    console.log(bookLibrary);
}
