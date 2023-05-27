import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080'; // Adjust the URL to match your Spring Boot backend endpoint

  constructor(private http: HttpClient) {}
// this class is designed for sevecies call that we implemented in the background
  getBooks(): Observable<Book[]> {
    console.log("Tracking",this.http.get<Book[]>(this.apiUrl+'/AllBooks')) ;
    return this.http.get<Book[]>(this.apiUrl+'/AllBooks');
  }

  addBook(book: Book): Observable<Book> {
    console.log("this fucntion is working",book.author)
    return this.http.post<Book>(this.apiUrl+'/addBook', book);
  }

  updateBook(book: Book): Observable<Book> {
    
    const url = `${this.apiUrl+'/updateBook'}/${book.id}`;
    return this.http.put<Book>(url, book);
  }
  
  deleteBook(id: number): Observable<void> {
    const url = `${this.apiUrl+'/deleteBook'}/${id}`;
    
    return this.http.delete<void>(url);
  }
  

}
