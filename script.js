const myLibrary = []

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if (this.read) {
      this.readStatus = "Read";
    } else {
      this.readStatus = "Not read";
    }
  }
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const book2 = new Book("Harry Potter", "J.K. Rowling", 400, false);
myLibrary.push(book1, book2);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function toCamelCase(str) {
  // Remove spaces and convert to camel case
  return str
    .replace(/\s+/g, "") // Remove spaces
    .replace(/[-_](.)/g, function (match, group1) {
      return group1.toUpperCase();
    });
}

const modal = document.querySelector("#modal");

const btn = document.querySelector(".addBook");

btn.addEventListener("click", () => {
  modal.style.display = "flex";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Get the form element
const form = document.querySelector(".addBookForm");
const books = document.querySelector("#books");

function populateBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    let myBook = document.createElement("tr");
    let book = myLibrary[i];
    let titles = [];

    const bookDivs = document.querySelectorAll(".book");

    bookDivs.forEach((bookDiv) => {
      const titleTags = bookDiv.querySelectorAll(".title");

      titleTags.forEach((titleTag) => {
        titles.push(titleTag.textContent);
      });
    });
    if (titles.includes(book.title)) {
      continue;
    }
    myBook.classList.add("book", toCamelCase(book.title));

    let bookTitle = document.createElement("td");
    bookTitle.textContent = `${book.title}`;

    let bookAuthor = document.createElement("td");
    bookAuthor.textContent = `${book.author}`;

    let bookPages = document.createElement("td");
    bookPages.textContent = `${book.pages} pages`;

    let bookReadStatus = document.createElement("td");
    let bookReadStatusBtn = document.createElement("button");
    bookReadStatus.appendChild(bookReadStatusBtn);
    bookReadStatusBtn.classList.add(
      "readStatusBtn",
      toCamelCase(book.title),
      book.read
    );
    bookReadStatusBtn.textContent = `${book.readStatus}`;

    let removeBtnCell = document.createElement("td");
    let removeBtn = document.createElement("button");
    removeBtnCell.appendChild(removeBtn)
    removeBtn.classList.add("removeBtn", toCamelCase(book.title));
    removeBtn.textContent = "Remove";

    myBook.appendChild(bookTitle);
    myBook.appendChild(bookAuthor);
    myBook.appendChild(bookPages);
    myBook.appendChild(bookReadStatus);
    myBook.appendChild(removeBtnCell);

    books.appendChild(myBook);
  }
}

populateBooks();

// Add submit event listener to the form
form.addEventListener("submit", (event) => {
  // Prevent the default form submission
  event.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked; // Get checkbox value

  // Convert the checkbox value to true or false explicitly
  read = read ? true : false;

  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);

  books.innerHTML = ""
  populateBooks()
  
  form.reset();
  modal.style.display = "none";
});

document.addEventListener("click", (event) => {
  if (event.target.matches(".readStatusBtn")) {
    const readStatusBtnClasses = event.target.classList;
    let classesArray = Array.from(readStatusBtnClasses);
    const bookToUpdate = myLibrary.find(
      (book) => toCamelCase(book.title) === classesArray[1]
    );
    if (classesArray[2] === "true") {
      event.target.classList.add(false);
      event.target.classList.remove(true);
      bookToUpdate.read = false;
      bookToUpdate.readStatus = false ? "Read" : "Not read";
      event.target.textContent = bookToUpdate.readStatus;
    } else if (classesArray[2] === "false") {
      event.target.classList.add(true);
      event.target.classList.remove(false);
      bookToUpdate.read = true;
      bookToUpdate.readStatus = true ? "Read" : "Not read";
      event.target.textContent = bookToUpdate.readStatus;
    }
  } else if (event.target.matches(".removeBtn")) {
    const removeBtnClasses = event.target.classList;
    let classesArray = Array.from(removeBtnClasses);
    const bookToRemoveIndex = myLibrary.findIndex(
      (book) => toCamelCase(book.title) === classesArray[1]
    );
    myLibrary.splice(bookToRemoveIndex, 1);
    books.innerHTML = ""
    populateBooks();
  }
});
