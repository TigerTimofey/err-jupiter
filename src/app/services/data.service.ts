import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  fetchFrontPageData() {
    return this.http.get(environment.apiUrl);
  }
}
