import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
})
export class UpdateuserComponent implements OnInit, OnChanges {
  @Input() userdoc: any;
  @Output() userUpdate = new EventEmitter<any>();

  userupdate = new FormGroup({
    email: new FormControl(''), //
    docu: new FormControl(''), //
    name: new FormControl('', [Validators.required]), //
    lastName: new FormControl('', [Validators.required]),
    documentType: new FormControl(''),
    mobil: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    address: new FormControl(''),
    city: new FormControl(''), // selector ciudad
    citycode: new FormControl(''), //
    country: new FormControl(''), // selector pais
    countrycode: new FormControl(''),
    state: new FormControl(''), // estado (bogota DC)
    homephone: new FormControl(''),
    workphone: new FormControl(''),
  });

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

  ngOnChanges(changes: SimpleChanges) {
    console.log('====================================');
    console.log(changes);
    console.log('====================================');
    if (changes.userdoc) {
      this.getDataUserbyDoc();
    }
  }

  public onCountryChange(event: any) {
    if (event.propiedad === 'pais_seleccionado') {
      this.userupdate.patchValue({ country: event.valor.CountryName });
      this.userupdate.patchValue({ countrycode: event.valor.CountryCode });
    }
  }

  public sendData() {
    this.apiservice.put('rgs/r', this.userupdate.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: res.msg,
          confirmButtonText: 'Aceptar',
        });
        this.userUpdate.emit(true);
      },
      (error) => {
        console.log('error al actualizar usuario', error);
        this.sweetalertservice.errorMessage('Error al actualizar usuario');
      }
    );
  }

  public onCityChange(event: any) {
    this.userupdate.patchValue({ city: event.valor.StateName });
    this.userupdate.patchValue({ citycode: event.valor.StateCode });
    this.userupdate.patchValue({
      state: event.valor.StateName + event.valor.StateCode,
    });
  }

  getDataUserbyDoc() {
    if (this.userdoc) {
      let body = {
        DocumentID: this.userdoc,
      };

      this.apiservice.post('cl/userxcc', body).subscribe(
        (res) => {
          this.userupdate.patchValue({
            name: res.msg[0].name ? res.msg[0].name : '',
          });
          this.userupdate.patchValue({
            lastName: res.msg[0].lastName ? res.msg[0].lastName : '',
          });
          this.userupdate.patchValue({
            email: res.msg[0].email ? res.msg[0].email : '',
          });
          this.userupdate.patchValue({
            docu: res.msg[0].docu ? res.msg[0].docu : '',
          });
          this.userupdate.patchValue({
            city: res.msg[0].city ? res.msg[0].city : '',
          });
          this.userupdate.patchValue({
            country: res.msg[0].country ? res.msg[0].country : '',
          });
          this.userupdate.patchValue({
            state: res.msg[0].state ? res.msg[0].state : '',
          });
        },
        (error) => {
          console.log('error al consultar usuarios', error);
        }
      );
    }
  }

  public removeData() {
    this.userdoc = '';
    this.userupdate.patchValue({ email: '' });
    this.userupdate.patchValue({ docu: '' });
    this.userupdate.patchValue({ name: '' });
    this.userupdate.patchValue({ lastName: '' });
    this.userupdate.patchValue({ documentType: '' });
    this.userupdate.patchValue({ mobil: '' });
    this.userupdate.patchValue({ city: '' });
    this.userupdate.patchValue({ citycode: '' });
    this.userupdate.patchValue({ countrycode: '' });
    this.userupdate.patchValue({ homephone: '' });
    this.userupdate.patchValue({ workphone: '' });
  }
}
