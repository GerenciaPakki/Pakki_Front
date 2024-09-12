import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './addcommercial.component.html',
  styleUrls: ['./addcommercial.component.css'],
})
export class AddcommercialComponent implements OnInit {
  addcommercialform = new FormGroup({
    businessname: new FormControl(''), //Nombre de negocio
    irs_nit: new FormControl('', [Validators.required]),
    nameassignedCommercial: new FormControl(''),
    assignedCommercial: new FormControl('', [Validators.required]),
  });
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {}

  public SendData() {
    console.log(this.addcommercialform.value);

    this.apiservice.put('bs/brcm', this.addcommercialform.value).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire(res.msg, '', 'success');
      },
      (error) => {
        console.error('Error al enviar informacion de crear Comercial', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error Al Crear Comercial'
        );
      }
    );
  }

  public BusinessSelect(event: any) {
    this.addcommercialform.patchValue({
      irs_nit: event.valor.busDataDB.id,
    });
  }

  selectedManager(event: any) {
    this.addcommercialform.patchValue({ assignedCommercial: event?.valor._id });
  }
}
