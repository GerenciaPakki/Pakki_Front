import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
declare const $: any;
@Component({
  selector: 'app-viewallcompanies',
  templateUrl: './viewallcompanies.component.html',
  styleUrls: ['./viewallcompanies.component.css'],
})
export class ViewallcompaniesComponent implements OnInit {
  dataCompanies: Array<any> = [];
  filter = '';
  p: number = 1;
  userdoc: any;
  databranchoffices: any = [];
  constructor(
    public fb: FormBuilder,
    private apiservice: ApiService,
    private sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {
    this.getDataCompanies();
  }

  public getDataCompanies() {
    this.apiservice.get('bs').subscribe(
      (res) => {
        // console.log('res', res);

        this.dataCompanies = res.ViewAllBusiness;

        console.log(this.dataCompanies);
      },
      (error) => {
        console.log('error al consultar companies', error);
      }
    );
  }

  public openModal(modal: String, data?: any) {
    if (modal == 'moreinfo') {
      this.databranchoffices = [];
      console.log('data', data);

      this.databranchoffices = data.branchoffices;
      console.log(this.databranchoffices);
    }

    $(`#${modal}`).modal('show');
  }

  companieCreated(evento: any) {
    if (evento == true) {
      this.closeModal('createcompany');
      this.getDataCompanies();
    }
  }
  public closeModal(modal: String) {
    $(`#${modal}`).modal('hide');
  }
}
