import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  fetchFrontPageData() {
    return this.http.get(environment.apiUrl).pipe(
      tap(res => console.log('API response:', res))
    );
  }
}
