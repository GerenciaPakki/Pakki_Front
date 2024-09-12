import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// const token = JSON.parse(localStorage.getItem('token'));

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path: string): Observable<any> {
    return this.http.get<any>(`${environment.API}${path}`).pipe(map((d) => d));
  }

  post(path: string, data?: any): any {
    return this.http
      .post<any>(`${environment.API}${path}`, data)
      .pipe(map((d) => d));
  }

  put(path: string, data?: any): any {
    return this.http
      .put<any>(`${environment.API}${path}`, data)
      .pipe(map((d) => d));
  }

  delete(path: string, data?: any): any {
    return this.http
      .delete<any>(`${environment.API}${path}`, data)
      .pipe(map((d) => d));
  }
}
