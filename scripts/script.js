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
const bookForm = document.querySelector('#book-form');
const inputs = document.querySelectorAll('input');
const read = document.querySelector('#read');
const notRead = document.querySelector('#not-read');
const pages = document.querySelector('#pages');

read.addEventListener('click', (event) => {
    checkboxHandler(event);
});
notRead.addEventListener('click', (event) => {
    checkboxHandler(event);
});


// focus and blur events
inputs.forEach(input => {
    input.addEventListener('focus', () => {    
    //   input.classList.remove('error');
    //   input.classList.remove('valid');
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
    return `"${this.title} by ${this.author}, ${this.pages}, ${this.read}"`;
    } 
}; 

// function addBookToLibrary(book) {
    
// }

// const hobbit = new Book("The Hobbit", "J.R.R Tolkien", "295 pages", "not read yet");

// console.log(hobbit.info());

function checkboxHandler(event) {
    if(event.target.id === 'read') {
        read.checked = true;
        notRead.checked = false;
    } else {
        read.checked = false;
        notRead.checked = true;
    }
}

// work on acepting only positive interger numbers
// function checkPages(event) {
//     if(pages.value < 1 || pages.value > 1000) {
//         pages.classList.add('error');
//     } else {
//         pages.classList.remove('error');
//     }
// }