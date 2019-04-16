let myLibrary = [];

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    if (read) {
      read_yet = "already read."
    }
    else {
      read_yet = "not read yet."
    }
    return (title + " by " + ", " + pages +  " pages, " + read_yet);
  }
}
function deleteBook(id) {
  var index = parseInt(id.substring(id.length - 1, id.length ), 10);
  removed = myLibrary.splice(index,1);
  localStorage.setObj('myLibrary', myLibrary);
  displayLibrary();
  //Force redraw otherwise the table size can be odd when deleting!;
  document.getElementById('library').style.height = "0";
  document.getElementById('library').offsetLeft;
  document.getElementById('library').style.height = "auto";
  document.getElementById('library').offsetLeft;


}
function toggleCheck(id) {
  var index = parseInt(id.substring(id.length - 1, id.length ), 10);
  myLibrary[index].read = !(myLibrary[index].read );
  localStorage.setObj('myLibrary', myLibrary);
}
function displayLibrary() {
  htmlTable = " <tr> \
                <th>Title</th> \
                <th>Author</th> \
                <th># of Pages</th> \
                <th>Read?</th> \
                </tr> \
              ";
  var ctr;
  for (ctr=0; ctr < myLibrary.length; ctr++) {
    if (myLibrary[ctr].read) {
      checked = "checked";
    } else {
      checked = "";
    }
    htmlTable += " <tr> \
                  <td>" + '<button class="delete" id="delete_'+ ctr + '" >&#x1f5d1;</button>' + myLibrary[ctr].title + "</td> \
                  <td>" + myLibrary[ctr].author + "</td> \
                  <td>" + myLibrary[ctr].pages + '</td> \
                  <td>      <label class = "switch"> \
                          <input type="checkbox" name="read" id="book-read_' + ctr +'"' + checked +'> \
                          <span class="slider round"></span> \
                        </label>' +  "</td> \
                  </tr> \
                ";
  }
  library=document.querySelector("#library");
  library.innerHTML = htmlTable;
  var ctr;
  for (ctr = 0; ctr < myLibrary.length; ctr++) {
    var id = "delete_"+ctr;
    var button;
    button = document.getElementById(id);
    button.addEventListener("click", function(){deleteBook(this.id);}, false);
    var id = "book-read_"+ctr;
    var toggle;
    toggle = document.getElementById(id);
    toggle.addEventListener("click", function(){toggleCheck(this.id);}, false);

  }

}


function addBookToLibrary(book) {
  myLibrary.push(book);
  localStorage.setObj('myLibrary',myLibrary);
  displayLibrary();

}
if(!localStorage.getItem('myLibrary')) {
  addBookToLibrary(new Book("Example Title", "Joseph Bloggs", 666, false));
  addBookToLibrary(new Book("A book", "A. N. Author", 999, true));
  addBookToLibrary(new Book("A book2", "A. N. Author", 1000000, true));
  addBookToLibrary(new Book("A book 3", "J. Smith", 3, false));
} else {
  myLibrary = localStorage.getObj('myLibrary');
  displayLibrary();
}


function addBookFromDOM() {
  var title = document.getElementById("book-title").value;
  var author = document.getElementById("book-author").value;
  var pages = document.getElementById("book-pages").value;
  var read = document.getElementById("book-read").checked;

  addBookToLibrary(new Book(title, author, pages, read));
  // console.log("Title: " + title + ", Author: " + author
  //   + ", Pages: " + pages + ", read?: " + read );
}
var newBookButton;
newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click", function(){addBookFromDOM()});
