import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';
import { ClonePostal } from '../../interfaces/clonepostal.interface';

declare const $: any;

@Component({
  selector: 'app-clonepostalcode',
  templateUrl: './clonepostalcode.component.html',
  styleUrls: ['./clonepostalcode.component.css'],
})
export class ClonepostalcodeComponent implements OnInit {
  @Input() data: ClonePostal;
  clonePostalForm: any;
  newcity: string = '';

  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      if (this.data.CountryCode) {
        this.clonePostalForm = this.data; // crear copia del postalcode recibido
        // console.log('clone', this.clonePostalForm);
      }
    }
  }

  ngOnInit(): void {}

  public closeModal(modal: String) {
    $(`#${modal}`).modal('hide');
  }

  public clonepostal() {
    this.clonePostalForm.CityName = this.newcity;
    console.log('body', this.clonePostalForm);

    this.apiservice.post('cpc/clopc', this.clonePostalForm).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire({
          title: res.msg,
          icon: 'success',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            this.closeModal('clonepostal');
            this.newcity = '';
          }
        });
      },
      (error) => {
        console.error('Error al enviar en clonar código postal', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error Al Clonar Código Postal'
        );
      }
    );
  }
}
