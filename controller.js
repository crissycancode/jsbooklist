import { Book , UI, Storage } from "./model.js";

//create event listeners
Storage.getBooks();
document.getElementById('book-form').addEventListener('submit',function(e){
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();


  //validation
  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('please fill in all fields', 'error');
  }else{
    ui.addBookToList(book);
    Storage.addBook(book);
    ui.showAlert('book added!', 'success');
    ui.clearFields();
  }
});

//event listener for delete
document.querySelector('#book-list').addEventListener('click', function(e){
  //instatiate ui prototype
  const ui = new UI();
  //delete prototype

  if(confirm('are you sure?')){
    Storage.removeBook(e.target.isbn);
    ui.deleteBook(e.target);
    ui.showAlert('book removed', 'success');
  }
  
});

//DOM loadevent 
document.addEventListener('DOMContentLoaded',Storage.displayBooks);