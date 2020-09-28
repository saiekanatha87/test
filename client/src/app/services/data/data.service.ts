import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = environment.serverUrl;

  constructor(
    private http: HttpClient
  ) { }

  getQuestions() {
    return this.http.get(`${this.baseUrl}/questions`).toPromise();
  }
}
