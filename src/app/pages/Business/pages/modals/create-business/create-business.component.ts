import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.css'],
})
export class CreateBusinessComponent implements OnInit {
  @Output() companiescreated = new EventEmitter<any>();
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService,
    private userservice: UserService
  ) {}

  businesscreate = new FormGroup({
    irs_nit: new FormControl('', [Validators.required]), //Nit
    tradename: new FormControl(''), // nombre sucursal
    businessname: new FormControl('', [Validators.required]), // nombre comercial del establecimiento
    companytype: new FormControl('', [Validators.required]), //  selector tipo compañia
    mainaddress: new FormControl('', [Validators.required]), // direccion principal
    phoneNumber: new FormControl(''),
    phoneDescription: new FormControl(''),
    cellphoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    cellphoneDescription: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    branchoffices: new FormControl(''), // Cantidad de sucursales
    city: new FormControl('', [Validators.required]), // selector ciudad
    citycode: new FormControl(''),
    country: new FormControl('', [Validators.required]), // selector pais
    countrycode: new FormControl(''),
    state: new FormControl(''),
    manager: new FormControl(''), // selector manager de los establecimientos
    manager_name: new FormControl('', [Validators.required]),
    observation: new FormControl(''),
    creatorUser: new FormControl(''), // usuario quien creo el establecimiento
  });

  ngOnInit(): void {
    let creator = this.userservice.getAllInfoUser();
    this.businesscreate.patchValue({ creatorUser: creator.collaborator?.id });
  }

  /**
   * The function updates the country and country code values in a form based on the selected country.
   * @param {any} event - The event parameter is an object that contains information about the event
   * that triggered the onCountryChange function. It could be an event object from a user action, such
   * as a button click or a dropdown selection. The specific properties and values of the event object
   * would depend on how it is defined and passed to
   */
  public onCountryChange(event: any) {
    /* console.log(event, 'padre'); */
    if (event.propiedad === 'pais_seleccionado') {
      this.businesscreate.patchValue({ country: event.valor.CountryName });
      this.businesscreate.patchValue({ countrycode: event.valor.CountryCode });
    }
  }

  /**
   * The function "onCityChange" logs the event object, sets the "city" and "citycode" values in the
   * "businesscreate" form to the selected city's StateName and StateCode respectively.
   * @param {any} event - The event parameter is an object that represents the event that triggered the
   * onCityChange function. It contains information about the event, such as the value selected by the
   * user.
   */
  public onCityChange(event: any) {
    this.businesscreate.patchValue({ city: event.valor.StateName });
    this.businesscreate.patchValue({ citycode: event.valor.StateCode });
    /*  this.businesscreate.patchValue({
      state: event.valor.StateName + event.valor.StateCode,
    }); */
  }

  public SendData() {
    console.log(this.businesscreate.value);

    this.apiservice.post('bs', this.businesscreate.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res.ok) {
          Swal.fire(res.msg, '', 'success');
          this.clearData();
          this.companiescreated.emit(true);
        } else {
          Swal.fire(res.msg, '', 'warning');
        }
      },
      (error) => {
        console.error('Error al enviar informacion de crear Business', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error Al Crear Businness'
        );
      }
    );
  }

  selectedManager(event: any) {
    /* console.log(event, 'manager select'); */
    this.businesscreate.patchValue({ manager: event.valor._id });
  }

  clearData() {
    this.businesscreate.patchValue({ irs_nit: '' });
    this.businesscreate.patchValue({ businessname: '' });
    this.businesscreate.patchValue({ companytype: '' });
    this.businesscreate.patchValue({ mainaddress: '' });
    this.businesscreate.patchValue({ phoneNumber: '' });
    this.businesscreate.patchValue({ phoneDescription: '' });
    this.businesscreate.patchValue({ cellphoneNumber: '' });
    this.businesscreate.patchValue({ cellphoneDescription: '' });
    this.businesscreate.patchValue({ email: '' });
    this.businesscreate.patchValue({ branchoffices: '' });
    this.businesscreate.patchValue({ city: '' });
    this.businesscreate.patchValue({ citycode: '' });
    this.businesscreate.patchValue({ country: '' });
    this.businesscreate.patchValue({ countrycode: '' });
    this.businesscreate.patchValue({ manager: '' });
    this.businesscreate.patchValue({ manager_name: '' });
    this.businesscreate.patchValue({ observation: '' });
  }

  selectedCompany(event: any) {
    /* console.log(event, 'compañia select'); */
    this.businesscreate.patchValue({ companytype: event.valor.name });
  }
}
