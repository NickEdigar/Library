import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Regex } from '../../utils/regex';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  isLoaded = false;
  newBook = false;
  form: FormGroup;
  book: Book;
  bookTmp: string;
  index: number;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {

    this.bookService.getAllBooks().subscribe((data) => {
      data.forEach(el => {
        this.books.push(new Book(el.tittle, el.author, el.date, el.id));
      });
      this.isLoaded = true;
    });

    this.form = new FormGroup({
      'tittle': new FormControl(null, [Validators.required], [this.tittleAsyncValidator.bind(this)]),
      'author': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required, Validators.pattern(Regex.validDate)])
    });

    this.newBookK();
  }

  onAddBook() {
    this.newBookK();
    this.newBook = true;
  }

  newBookK() {
    this.book = new Book('', '', '');
  }

  onDeleteBook() {
    this.books.splice(this.index, 1);
  }

  onChangeBook(book, ind) {
    this.bookTmp = JSON.stringify(book);
    this.book = JSON.parse(this.bookTmp);
    this.index = ind;
    this.newBook = false;
  }

  onSaveBook() {
    if (this.newBook) {
      this.books.unshift(this.book);
    } else {
      this.books.splice(this.index, 1, this.book);
    }
  }

  validateTittle(tittle: string) {

    return new Promise(resolve => {
      const findTittle = this.books.find((el => (el.tittle === tittle && JSON.parse(this.bookTmp).tittle !== tittle)));
      setTimeout(() => {
        if (findTittle) {
          resolve({
            asyncInvalid: true
          });
        } else {
          resolve(null);
        }
      }, 500);
    });
  }

  tittleAsyncValidator(control: FormControl) {

    return this.validateTittle(control.value);
  }
}
