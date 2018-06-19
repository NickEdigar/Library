import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class BasicApi {

  private baseUrl = 'https://library-server.herokuapp.com/';

  constructor(public http: HttpClient) {
  }

  getUrl(url: string) {
    return this.baseUrl + url;
  }

  getBasicApi(key: string): Observable<any> {
    return this.http.get(this.getUrl(key));
  }
}
