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

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Logic for addBook.html /////////////////////////////////
function addBookPage() {
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
        // redirect to the library page
    });

    function addBookToLibrary() {
        let bookReadStatus = read.checked === true ? 'read' : 'not read yet';
        let book = new Book(title.value, author.value, pages.value, bookReadStatus);
        bookLibrary.push(book);
        console.log(book.info());
    }

    const hobbit = new Book("The Hobbit", "J.R.R Tolkien", "295", "read");
    const hobbit2 = new Book("The Hobbit 2", "J.R.R Tolkien", "295", "not read yet");
    const hobbit3 = new Book("The Hobbit 3", "J.R.R Tolkien", "295", "not read yet");
    bookLibrary.push(hobbit, hobbit2, hobbit3);

    function checkboxHandler(event) {
        if(event.target.id === 'read') {
            read.checked = true;
            notRead.checked = false;
        } else {
            read.checked = false;
            notRead.checked = true;
        }
    }    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Logic for index.html /////////////////////////////////////////////////////////////////////
function index() {
    const cardContainer = document.getElementsByClassName(".card-container");
    const sampleCard = document.getElementById("sample");

    // used to test if display none works as intendeded 
    // window.addEventListener('click', () => { 
    //     sampleCard.classList.add("hide");
    // });

    // build card display... still need to complete
    function buildBookDisplay(book){
        const cardDiv = document.createElement("div");
        const cardInputDiv = document.createElement("div");
        const paraTittle = document.createElement("p");
        const paraAuthor = document.createElement("p");
        const paraPages = document.createElement("p");
        const inputHeart = document.createElement("input")
        const inputCheck = document.createElement("input")
        const inputQueue = document.createElement("input")
        const inputDelete = document.createElement("input")
        
        paraTittle.textContent = book.title;
        paraAuthor.textContent = book.author;
        paraPages.textContent = book.pages + " " + "pages"

    }    
}
