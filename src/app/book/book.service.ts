import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookService {

    constructor(private _httpService: Http){}

    getAllBooks(): Observable<Book[]> {
       return this._httpService.get("http://localhost:8080/api/books")
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
        
    }

    addBook(book: Book) {
        let body = JSON.stringify(book);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        if (book.id) {
            return this._httpService.put("http://localhost:8080/api/books/"+book.id, body, options);
        } else {
            return this._httpService.post("http://localhost:8080/api/books", body, options);
        }
    }

    deleteBook(id: string) {
        return this._httpService.delete("http://localhost:8080/api/books/" + id);
    }

    getBookById(id: string) : Observable<Book> {
        return this._httpService.get("http://localhost:8080/api/books/" + id)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

}