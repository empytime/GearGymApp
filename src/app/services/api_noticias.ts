import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'facd754a56c146de8ea2aa27d48faf22';
  private apiUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  getSportsNews(): Observable<any> {
    const url = `${this.apiUrl}?category=sports&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}