import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createpostal',
  templateUrl: './createpostal.component.html',
  styleUrls: ['./createpostal.component.css'],
})
export class CreatepostalComponent implements OnInit {
  @Input() CountryCode: any;

  createPostalCode = new FormGroup({
    CountryCode: new FormControl('', [Validators.required]), //
    PostalCodeCity: new FormControl('', [Validators.required]), //
    CityName: new FormControl('', [Validators.required]), //
    StateName: new FormControl(''),
    StateCode: new FormControl('', [Validators.minLength(1)]),
    /* StateGuidance: new FormControl('', [Validators.required]),
    
    Cam1: new FormControl('', [Validators.required]),
    Cam2: new FormControl('', [Validators.required]),
    Lat: new FormControl(''), //
    Log: new FormControl('', [Validators.required]),
    Cam3: new FormControl('', [Validators.required]), */
  });
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.CountryCode) {
      // console.log(this.CountryCode);
      this.createPostalCode.patchValue({ CountryCode: this.CountryCode });
      // this.getDataUserbyDoc();
    }
  }

  public removeData() {
    this.createPostalCode.setValue({
      CountryCode: '',
      PostalCodeCity: '',
      CityName: '',
      StateName: '',
      StateCode: '',
    });
  }

  public onCityChange(event: any) {
    console.log('ciudad en el padre', event.valor);

    this.createPostalCode.patchValue({ CityName: event.valor.CityName });
    // this.createPostalCode.patchValue({ StateName: event.valor.StateName });
    /* this.createPostalCode.patchValue({
      StateCode: event.valor.StateCode,
    }); */
  }

  public sendData() {
    console.log(this.createPostalCode.value);

    this.apiservice.post('dcc/pcone', this.createPostalCode.value).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire(res.msg, '', 'success');
      },
      (error) => {
        console.error(
          'Error al enviar informacion de crear código postal',
          error
        );
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error Al Crear Código'
        );
      }
    );
  }
}
