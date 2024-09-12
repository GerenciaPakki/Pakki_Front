import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ApiService } from './../services/api.service';

@Injectable({
  providedIn: 'root'
})

export class ApiGoogleService {

  private apiUrlAllCities= `cities`;

  constructor(
    private http: HttpClient,
    private apiServices: ApiService,
  ) { }

  getAllCities() {

      return this.apiServices.get(this.apiUrlAllCities)
      .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
              if (error.status === HttpStatusCode.Conflict) {
                  return throwError('Algo esta fallando en el server');
              }
              if (error.status === HttpStatusCode.NotFound) {
                  return throwError('El producto no existe');
              }
              if (error.status === HttpStatusCode.Unauthorized) {
                  return throwError('No estas permitido');
              }
              return throwError('Ups algo salio mal');
          })
      );
  }
}
