import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
declare const $: any;
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  id;
  datadiscounts: any;
  filter: string = '';
  p = 1;
  countrycode: any;
  constructor(
    public fb: FormBuilder,
    private apiservice: ApiService,
    private sweetalertservice: SweetalertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  public getData() {
    this.apiservice.get('cd/allpro').subscribe(
      (res) => {
        console.log(res);
        this.datadiscounts = res.msg
      },
      (error) => {
        console.log('error al consultar usuarios', error);
      }
    );
  }

  public openModal(modal: String, cc?: any) {
    console.log(modal, cc);
    this.id = "645411dd472fab7dea659dc9";

    $(`#${modal}`).modal('show');
  }
}
