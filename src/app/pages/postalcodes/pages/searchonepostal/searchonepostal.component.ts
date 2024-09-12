import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
declare const $: any;

@Component({
  selector: 'app-searchonepostal',
  templateUrl: './searchonepostal.component.html',
  styleUrls: ['./searchonepostal.component.css'],
})
export class SearchonepostalComponent implements OnInit {
  @Input() CountryCode: any;

  viewPostalCode: FormGroup = new FormGroup({
    CountryCode: new FormControl('', [Validators.required]), //
    PostalCodeCity: new FormControl(''), //
    CityName: new FormControl('', [Validators.required]), //
    StateName: new FormControl('', [Validators.required]), //
    StateCode: new FormControl('', [Validators.required]),
    StateGuidance: new FormControl('', [Validators.required]),
    StateNumber: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    Cam1: new FormControl('', [Validators.required]),
    Cam2: new FormControl('', [Validators.required]),
    Lat: new FormControl(''), //
    Log: new FormControl('', [Validators.required]),
    Cam3: new FormControl('', [Validators.required]),
  });
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.CountryCode) {
      // console.log('cambio codigo postal', this.CountryCode);
      this.viewPostalCode.patchValue({ CountryCode: this.CountryCode });
    }
  }

  public removeData() {
    this.viewPostalCode.patchValue({ PostalCodeCity: '' });
    this.viewPostalCode.patchValue({ CityName: '' });
    this.viewPostalCode.patchValue({ StateName: '' });
    this.viewPostalCode.patchValue({ StateCode: '' });
    this.viewPostalCode.patchValue({
      StateGuidance: '',
    });
    this.viewPostalCode.patchValue({ StateNumber: '' });
    this.viewPostalCode.patchValue({ Cam1: '' });
    this.viewPostalCode.patchValue({ Cam2: '' });
    this.viewPostalCode.patchValue({ Lat: '' });
    this.viewPostalCode.patchValue({ Log: '' });
    this.viewPostalCode.patchValue({ Cam3: '' });
  }

  /** buscador de código postal */
  public codigoChange(event: any) {
    console.log(event);
    this.viewPostalCode.patchValue({ CityName: event.valor.CityName });
    this.viewPostalCode.patchValue({ StateName: event.valor.StateName });
    this.viewPostalCode.patchValue({ StateCode: event.valor.StateCode });
    this.viewPostalCode.patchValue({
      StateGuidance: event.valor.StateGuidance,
    });
    this.viewPostalCode.patchValue({ StateNumber: event.valor.StateNumber });
    this.viewPostalCode.patchValue({ Cam1: event.valor.Cam1 });
    this.viewPostalCode.patchValue({ Cam2: event.valor.Cam2 });
    this.viewPostalCode.patchValue({ Lat: event.valor.Lat });
    this.viewPostalCode.patchValue({ Log: event.valor.Log });
    this.viewPostalCode.patchValue({ Cam3: event.valor.Cam3 });
    console.log(this.viewPostalCode.value);
  }

  public openModal(modal: String) {
    $(`#${modal}`).modal('show');
  }
}
