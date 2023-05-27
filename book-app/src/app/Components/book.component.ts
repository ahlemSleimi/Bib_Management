import { Component, OnInit } from '@angular/core';
import { Book } from '../Models/book.model';
import { BookService } from '../Services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = {
    id: 0,
    title: '',
    author: ''
  };
  backgroundImages: string[] = [];
  currentImageIndex: number = 0;
  backgroundImageUrl: string='';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
    this.initNewBook();
    // this.changeBackgroundImage();
    // setInterval(() => {
    //   this.changeBackgroundImage();
    // }, 5000);
  }

  changeBackgroundImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
    this.backgroundImageUrl = `url('../assets/${this.backgroundImages[this.currentImageIndex]}')`;
  }
  



  selectedBook: Book | null = null;
  selectedBookTitle: string = '';
  selectedBookAuthor: string = '';

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  // addBook(): void {
  //   this.bookService.addBook(this.newBook)
  //     .subscribe(book => {
  //       this.books.push(book);
  //       this.newBook = { id: 0, title: '', author: '' }; // Reset the newBook object
  //     });
  // }
  // in order to use the same form for the update and add we implemented a single function
  addOrUpdateBook(): void {
    if (this.selectedBook) {
      // Updating an existing book
      this.selectedBook.title = this.selectedBookTitle;
      this.selectedBook.author = this.selectedBookAuthor;

      this.bookService.updateBook(this.selectedBook)
        .subscribe(updatedBook => {
          const index = this.books.findIndex(b => b.id === updatedBook.id);
          if (index !== -1) {
            this.books[index] = updatedBook;
          }
          this.clearForm();
        });
    } else {
      // Adding a new book
      const newBook: Book = {
        id: 0,
        title: this.selectedBookTitle,
        author: this.selectedBookAuthor
      };

      this.bookService.addBook(newBook)
        .subscribe(book => {
          this.books.push(book);
          this.clearForm();
        });
    }
  }





  // This Method is used for selection from the table and to get the filds in their places
  updateBook(book: Book): void {
    this.selectedBook = { ...book }; // Copy the selected book to the selectedBook property
    // Set the values of the form inputs
    console.log("check id ", this.selectedBook.id)
    this.selectedBookTitle = book.title;
    this.selectedBookAuthor = book.author;
    
    //this.newBook = { id: this.selectedBook.id, title: this.selectedBook.title, author: this.selectedBook.author };
  }

  // updateBook(book: Book): void {
  //   this.bookService.updateBook(book)
  //     .subscribe(updatedBook => {
  //       const index = this.books.findIndex(b => b.id === updatedBook.id);
  //       if (index !== -1) {
  //         this.books[index] = updatedBook;
  //       }
  //     });
  // }
  

  // this method is ment to dlete books from table
  deleteBook(id: number): void {
    this.bookService.deleteBook(id)
      .subscribe(() => {
        this.books = this.books.filter(b => b.id !== id);
        console.log('book with id : ',id,' deleted')
      });
  }
  // after the update this function will do the job to clear the field
  clearForm(): void {
    // this.selectedBook = null;
    // this.newBook = { id: 0, title: '', author: '' };
    this.selectedBook = null;
    this.selectedBookTitle = '';
    this.selectedBookAuthor = '';
  }

  initNewBook(): void {
    this.newBook = { id: 0, title: '', author: '' };
  }
  
}
