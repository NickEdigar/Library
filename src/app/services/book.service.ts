import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Book } from '../models/book';
import { BasicApi } from '../core/basicApi';

@Injectable()
export class BookService extends BasicApi {

  public books: Book[];

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllBooks(): Observable<Book[]> {
    return this.getBasicApi('books');
  }
}
