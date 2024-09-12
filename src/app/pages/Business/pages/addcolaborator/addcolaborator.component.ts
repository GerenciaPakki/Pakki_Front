import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcolaborator',
  templateUrl: './addcolaborator.component.html',
  styleUrls: ['./addcolaborator.component.css'],
})
export class AddcolaboratorComponent implements OnInit {
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  addcolaboratorform = new FormGroup({
    businessname: new FormControl('', [Validators.required]), //Nombre de negocio
    nit_empresa: new FormControl(''), //Nit
    irs_nit: new FormControl('', [Validators.required]),
    id_brachOffice_name: new FormControl(''), // nombre sucursal
    id_brachOffice: new FormControl('', [Validators.required]),
    collaborator_name: new FormControl(''),
    collaborator: new FormControl('', [Validators.required]),
    profile_name: new FormControl(''),
    profile: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  public SendData() {
    console.log(this.addcolaboratorform.value);

    this.apiservice.put('bs/brcl', this.addcolaboratorform.value).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire(res.msg, '', 'success');
      },
      (error) => {
        console.error('Error al enviar informacion de crear Business', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error Al Crear Businness'
        );
      }
    );
  }

  public BusinessSelect(event: any) {
    //console.log(event.valor.busDataDB, 'Recibido en el padre');
    this.addcolaboratorform.patchValue({
      nit_empresa: event.valor.busDataDB.business.irs_nit,
    });
    this.addcolaboratorform.patchValue({
      irs_nit: event.valor.busDataDB.id,
    });
    //console.log(this.addcolaboratorform.value);
  }
  selectedManager(event: any) {
    //console.log(event, 'manager select');
    this.addcolaboratorform.patchValue({ collaborator: event?.valor._id });
  }

  public branchSelect(event: any) {
    /* console.log(event); */
    this.addcolaboratorform.patchValue({ id_brachOffice: event.valor._id });
  }

  public profileSelected(event: any) {
    this.addcolaboratorform.patchValue({ profile_name: event.valor.name });
    this.addcolaboratorform.patchValue({ profile: event.valor._id });
  }
}
