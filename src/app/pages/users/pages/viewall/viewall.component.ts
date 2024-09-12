import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';

declare const $: any;
@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css'],
})
export class ViewallComponent implements OnInit {
  dataUser: Array<any>;
  filter = '';
  p: number = 1;
  userdoc: any;
  constructor(
    public fb: FormBuilder,
    private apiservice: ApiService,
    private sweetalertservice: SweetalertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataUsers();
  }

  public getDataUsers() {
    this.apiservice.get('lg/allusr').subscribe(
      (res) => {
        console.log('res users', res);

        this.dataUser = res.data;
      },
      (error) => {
        console.log('error al consultar usuarios', error);
      }
    );
  }

  public openModal(modal: String, cc?: any) {
    console.log('====================================');
    console.log(cc);
    console.log('====================================');
    if (modal == 'updateuser') {
      this.userdoc = cc;
    }

    $(`#${modal}`).modal('show');
  }

  public deleteUser(document: any) {
    Swal.fire({
      icon: 'info',
      title: '¿Esta seguro que desea eliminar el usuario?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let body = { DocumentID: document };
        console.log('====================================');
        console.log(body);
        console.log('====================================');
        this.apiservice.post('lg/delusrs', body).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: res.msg,
              confirmButtonText: 'Aceptar',
            });
            this.getDataUsers();
          },
          (error) => {
            console.log('error al crear usuario', error);
            this.sweetalertservice.errorMessage(
              error?.error?.msg
                ? error?.error?.msg
                : 'Error al eliminar usuario'
            );
          }
        );
      }
    });
  }

  Usercreated(evento: any) {
    if (evento == true) {
      this.closeModal('createuser');
      this.getDataUsers();
    }
  }

  userUpdate(evento: any) {
    if (evento == true) {
      this.closeModal('updateuser');
      this.getDataUsers();
    }
  }

  public closeModal(modal: String) {
    $(`#${modal}`).modal('hide');
  }
}
