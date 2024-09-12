import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
})
export class CreateuserComponent implements OnInit {
  usercreate = new FormGroup({
    name: new FormControl('', [Validators.required]), //
    lastName: new FormControl('', [Validators.required]),
    documentType: new FormControl('', [Validators.required]),
    docu: new FormControl('', [Validators.required]), //
    mobil: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.required,
    ]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      Validators.required,
    ]),
    city: new FormControl('', [Validators.required]), // selector ciudad
    citycode: new FormControl(''), //
    country: new FormControl('', [Validators.required]), // selector pais
    countrycode: new FormControl(''),
    state: new FormControl(''), // estado (bogota DC)
    homephone: new FormControl(''),
    workphone: new FormControl('', [Validators.required]),
  });

  @Output() usuariocreado = new EventEmitter<any>();

  tipo_doc = [
    { value: 'cc', viewValue: 'cedula de ciudadania' },
    { value: 'ce', viewValue: 'cedula de extranjeria' },
    { value: 'nit', viewValue: 'numero de identificacion tributaria' },
    { value: 'pap', viewValue: 'pasaporte' },
  ];

  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {}

  public onCountryChange(event: any) {
    /* console.log(event, 'padre'); */
    if (event.propiedad === 'pais_seleccionado') {
      this.usercreate.patchValue({ country: event.valor.CountryName });
      this.usercreate.patchValue({ countrycode: event.valor.CountryCode });
    }
  }

  public sendData() {
    this.apiservice.post('rgs/r', this.usercreate.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: res.msg,
          confirmButtonText: 'Aceptar',
        });

        this.usuariocreado.emit(true);
      },
      (error) => {
        console.log('error al crear usuario', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error al crear usuario'
        );
      }
    );
  }

  public onCityChange(event: any) {
    this.usercreate.patchValue({ city: event.valor.StateName });
    this.usercreate.patchValue({ citycode: event.valor.StateCode });
    this.usercreate.patchValue({
      state: event.valor.StateName + event.valor.StateCode,
    });
  }
}
