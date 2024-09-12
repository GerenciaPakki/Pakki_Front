import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-business-branch',
  templateUrl: './update-business-branch.component.html',
  styleUrls: ['./update-business-branch.component.css'],
})
export class UpdateBusinessBranchComponent implements OnInit {
  businessupdate = new FormGroup({
    businessname: new FormControl(''), // nombre comercial del negocio, no se puede editar. ok
    tradename: new FormControl(''), // Nombre de surcusal (buscador ya esta) () ok
    mainaddress: new FormControl(''), // direccion principal ok
    phonenumber: new FormControl(''), // ok
    phonedescription: new FormControl('', [Validators.required]), // ok
    cellphonenumber: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
    ]), // ok
    cellphonedescription: new FormControl('', [Validators.required]), // ok
    email: new FormControl('', [
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]), //ok
    city: new FormControl(''), // selector ciudad ok
    citycode: new FormControl(''), // ok
    country: new FormControl(''), // selector pais // ok
    countrycode: new FormControl(''),
    state: new FormControl(''),
    WorkdayTomorrow: new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
    }),
    WorkdayLate: new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
    }),
    serviceday: new FormControl(''),
    observation: new FormControl(''),
    branchoffices: new FormControl(''),
  });

  nitbusiness;

  days = [
    { value: 'Lunes', viewValue: 'Lunes' },
    { value: 'Martes', viewValue: 'Martes' },
    { value: 'Miercoles', viewValue: 'Miercoles' },
    { value: 'Jueves', viewValue: 'Jueves' },
    { value: 'Viernes', viewValue: 'Viernes' },
    { value: 'Sabado', viewValue: 'Sabado' },
    { value: 'Domingo', viewValue: 'Domingo' },
  ];

  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {}

  public SendData() {
    console.log(this.businessupdate.value);

    this.apiservice
      .put(`bs/br/${this.nitbusiness}`, this.businessupdate.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.ok) {
            this.clearData();
            Swal.fire(res.msg, '', 'success');
          } else {
            Swal.fire(res.msg, '', 'warning');
          }
        },
        (error) => {
          console.error('Error al enviar informacion de crear Business', error);
          Swal.fire(error.error.msg, '', 'warning');
        }
      );
  }

  public BusinessSelect(event: any) {
    this.nitbusiness = event.valor.busDataDB.id;
  }

  /**
   * The function "onCityChange" logs the event object, sets the "city" and "citycode" values in the
   * "businesscreate" form to the selected city's StateName and StateCode respectively.
   * @param {any} event - The event parameter is an object that represents the event that triggered the
   * onCityChange function. It contains information about the event, such as the value selected by the
   * user.
   */
  public onCityChange(event: any) {
    this.businessupdate.patchValue({ city: event.valor.CityName });
    this.businessupdate.patchValue({ citycode: event.valor.StateCode });
    this.businessupdate.patchValue({
      state: event.valor.StateName + '-' + event.valor.StateCode,
    });
  }

  public onCountryChange(event: any) {
    this.businessupdate.patchValue({ countrycode: event.valor.CountryCode });
  }

  public optionseleccionada() {
    console.log(this.businessupdate.value);
  }

  clearData() {
    this.businessupdate.patchValue({ businessname: '' });
    this.businessupdate.patchValue({ tradename: '' });
    this.businessupdate.patchValue({ mainaddress: '' });
    this.businessupdate.patchValue({ phonenumber: '' });
    this.businessupdate.patchValue({ phonedescription: '' });
    this.businessupdate.patchValue({ cellphonenumber: '' });
    this.businessupdate.patchValue({ cellphonedescription: '' });
    this.businessupdate.patchValue({ email: '' });
    this.businessupdate.patchValue({ city: '' });
    this.businessupdate.patchValue({ citycode: '' });
    this.businessupdate.patchValue({ country: '' });
    this.businessupdate.patchValue({ countrycode: '' });
    this.businessupdate.patchValue({ state: '' });
    this.businessupdate.patchValue({ serviceday: '' });
    this.businessupdate.patchValue({ branchoffices: '' });
    // this.businessupdate.get('WorkdayTomorrow').patchValue({ start: ''})
    this.businessupdate.patchValue({ observation: '' });
  }
}
