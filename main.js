// CREATES NECESSARY OBJECTS
// creates Library as an empty array
const myLibrary = [];

// selects form element to reset after new Book object is added
const form = document.querySelector("form");

// selects cards container to append each card child to (each Book object goes on each card)
const cards = document.querySelector(".cards");

// selects newBookButton to show the div with input fields when clicked
const newBookButton = document.querySelector(".new-book");

// selects the div with input fields
const hiddenDiv = document.querySelector(".inputs");

function validateText(inputElement, messageElement) {
  if (!inputElement.checkValidity()) {
    inputElement.validationMessage;
    messageElement.textContent = "Please fill out this field.";
    messageElement.style.color = "red";
  } else {
    messageElement.textContent = "Input is valid.";
    messageElement.style.color = "green";
  }
}

function validatePages(inputElement, messageElement) {
  if (
    inputElement.validity.valueMissing ||
    inputElement.validity.rangeUnderflow
  ) {
    inputElement.setCustomValidity("Input is missing and invalid.");
  } else {
    inputElement.setCustomValidity("");
  }
  // custom validity message is only displayed when prompted to, in call of reportValidity() on the input
  inputElement.reportValidity();
}

function validateStatus(inputElement, messageElement) {
  if (inputElement.willValidate) {
    if (inputElement.validity.valid) {
      messageElement.textContent = "Input is valid.";
      messageElement.style.color = "green";
    } else {
      messageElement.textContent = "Input is invalid.";
      messageElement.style.color = "red";
    }
  }
}

const fields = [
  {
    selector: ".title",
    messageSelector: "#title-message",
    validationFunction: validateText,
  },
  {
    selector: ".author",
    messageSelector: "#author-message",
    validationFunction: validateText,
  },
  {
    selector: ".pages",
    messageSelector: "#pages-message",
    validationFunction: validatePages,
  },
  {
    selector: ".status",
    messageSelector: "#status-message",
    validationFunction: validateStatus,
  },
];

fields.forEach((field) => {
  const inputElement = document.querySelector(field.selector);
  const messageElement = document.getElementById(
    field.messageSelector.slice(1)
  );

  if (inputElement && messageElement) {
    inputElement.oninput = () =>
      field.validationFunction(inputElement, messageElement);
    inputElement.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        field.validationFunction(inputElement, messageElement);
        event.preventDefault();
      }
    });
  }
});

// DISPLAYS FORM INPUTS ONCE USER CLICKS ON "NEW BOOK" BUTTON
// "hidden" class is removed from the div with input fields when newBookButton is clicked
newBookButton.addEventListener("click", () => {
  hiddenDiv.classList.remove("hidden");
});

// selects submitButton to create new Book object and add it to myLibrary array
const submitButton = document.querySelector(".submit-form");

// constructor of a Book object; parameters are values assigned to properties
// function Book(title, author, pages, status) {

//     // this is the newly created object in the constructor
//     // Book.property = parameter;
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.status = status;
// }
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// HANDLES SUBMISSION OF INPUTS, AND ADDS BOOK TO LIBRARY
// listens for submission of new user inputs
submitButton.addEventListener("click", (event) => {
  // prevents the sending of data to a server by default
  event.preventDefault();

  // access the value property of the four input elements and assign them to variables
  const aTitle = document.querySelector(".title").value;
  const aAuthor = document.querySelector(".author").value;
  const aPages = document.querySelector(".pages").value;
  const aStatus = document.querySelector(".status").value;

  // creates a new aBook object with the variables defined above as parameters
  const aBook = new Book(aTitle, aAuthor, aPages, aStatus);

  if (aTitle === "" || aAuthor === "" || aPages === "" || aStatus === "") {
    alert("One or more fields are missing info.");
  } else if (
    !title.validity.valid ||
    !author.validity.valid ||
    !pages.validity.valid ||
    !readOrNot.validity.valid
  ) {
    alert("One or more fields are missing info.");
  } else {
    // stores new aBook object into the myLibrary array
    myLibrary.push(aBook);

    // clears the input fields of the form
    form.reset();

    // displays the new aBook object as a card in the Library
    addBookToLibrary();
  }
});

// DEFINES HOW A CARD WITH A BOOK OBJECT IS PUT INTO LIBRARY
function addBookToLibrary() {
  // property that sets the cards container to empty
  cards.innerHTML = "";

  // loops through each Book object in the myLibrary array
  // each Book object is a card and its number in the array is its index
  myLibrary.forEach((card, index) => {
    const div = createCard(card, index);
    //makes the newly created div with class "aCard", a child of the cards container
    cards.appendChild(div);
  });

  // by including in this function, ensures the removeButton event listeners are attached to each rendering of the library books
  setUpRemoveButtons();

  setUpStatusChangeButtons();
}

// DEFINES HOW A CARD IS CREATED FROM A BOOK OBJECT
function createCard(card, index) {
  // creates a div element for each Book object in the array
  const div = document.createElement("div");

  // adds "aCard" class to the div created, each aBook'd data with be printed on each .aCard div
  div.classList.add("aCard");

  // displays each newly created div with class "aCard" with line breaks between the properties
  // accesses each of the 4 four properties for each Book object
  // creates two buttons
  div.innerHTML = `Title: ${card.title}<br>
        Author: ${card.author}<br> 
        Pages: ${card.pages}<br>
        Read Status: ${card.status}<br>
        <button class="card-button remove" data-index="${index}">Remove Book</button>
        <button class="card-button status-change" data-index="${index}">Switch Status</button>`;
  // buttons above: inserting the index value for each button's data-index attribute

  return div;
}

// REMOVES THE BOOK OBJECT/CARD
function setUpRemoveButtons() {
  // selects Remove buttons on all divs with class "aCard"
  const removeButtons = document.querySelectorAll(".remove");

  // loops through the NodeList of removeButtons
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // converts the value of the data-index attribute to an int, and assigns it to bookToRemove
      const bookToRemove = parseInt(button.getAttribute("data-index"));

      // if the bookToRemove variable is not NOT a number (aka. it DOES returns true if bookToRemove is a valid number)
      if (!isNaN(bookToRemove)) {
        // array.splice(start index for deleting elements in the array, deleteCount);
        myLibrary.splice(bookToRemove, 1);

        // re-renders the library after removing a book
        addBookToLibrary();
      }
    });
  });
}

// HANDLES THE SWITCH OF READ STATUS FOR A BOOK
function setUpStatusChangeButtons() {
  // selects Switch Status buttons on all divs with class "status-change"
  const statusChangeButtons = document.querySelectorAll(".status-change");

  // loops through the Nodelist of statusChangeButtons
  statusChangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // converts the value of the data-index attribute to an int, and assign the int to the bookToSwitchStatus
      const bookToSwitchStatus = parseInt(button.getAttribute("data-index"));

      // if conditional returns trur, bookSwitchStatus is a valid number AND myLibrary has bookToSwitchStatus as an index
      if (!isNaN(bookToSwitchStatus) && myLibrary[bookToSwitchStatus]) {
        // toggle the status property of the Book object with index bookSwitchStatus
        myLibrary[bookToSwitchStatus].toggleStatus();

        // re-renders the library after switching a book's status
        addBookToLibrary();
      }
    });
  });
}

// DEFINES HOW READ STATUS IS SWITCHED ON BOOK PROTOTYPE
// (if I defined this method directly on Book and not on the Book prototype,
// each Book instance would have its own copy of the method which is inefficient memory-wise)
Book.prototype.toggleStatus = function () {
  // if the value of the current read status is Yes, it changes to No, and vice versa
  this.status = this.status === "Yes" ? "No" : "Yes";
};
