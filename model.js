export class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

export class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
  
    list.appendChild(row);
  };
  
  //clear text fields
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    
  };
  
  showAlert(message, className) {
    //crate element
    const div = document.createElement('div');
    //add class name
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form =  document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
  
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  };
  
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  };
}

export class Storage {

  static displayBooks(){
    //???
  }

  static getBooks(){
    let bookDetails; 
    const ui = new UI();
    if(localStorage.getItem('book')===null){
      bookDetails = [];
    }else{
      bookDetails = JSON.parse(localStorage.getItem('book'));
    }
    for(let i = 0; i < bookDetails.length; i++){
      ui.addBookToList(bookDetails[i]);
    }
  }
 
  static addBook(book){
    let newbook;
    if (localStorage.getItem('book') === null){
      newbook = [];
    }else{
      newbook = JSON.parse(localStorage.getItem('book'));
    }
    newbook.push(book);
    localStorage.setItem('book', JSON.stringify(newbook));
  }

  static removeBook(isbn){
    let thisISBN;
    if(localStorage.getItem('book') === null){
      thisISBN = [];
    }else{
      thisISBN = JSON.parse(localStorage.getItem('book'));
    }
    const index = thisISBN.indexOf(isbn);
    thisISBN.splice(index, 1);
    localStorage.setItem('book', JSON.stringify(thisISBN));
  }
}


