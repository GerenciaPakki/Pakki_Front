import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  /** Obtener El Negocio al que esta asociado el usuario */

  getbusinessName() {
    let data = JSON.parse(localStorage.getItem('dataUser'));
    return data.business.businessName;
  }

  getAllInfoUser() {
    let data = JSON.parse(localStorage.getItem('dataUser'));
    return data;
  }
}
