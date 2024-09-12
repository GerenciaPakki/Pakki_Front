import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
declare const $: any;

@Component({
  selector: 'app-viewpostal',
  templateUrl: './viewpostal.component.html',
  styleUrls: ['./viewpostal.component.css'],
})
export class ViewpostalComponent implements OnInit {
  datacountry: any;
  filter: string = '';
  p = 1;
  countrycode: any;

  constructor(
    public fb: FormBuilder,
    private apiservice: ApiService,
    private sweetalertservice: SweetalertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataPostal();
  }

  public getDataPostal() {
    this.apiservice.post('cpc/allco').subscribe(
      (res) => {
        this.datacountry = res.msg;
      },
      (error) => {
        console.log('error al consultar usuarios', error);
      }
    );
  }

  public openModal(modal: String, countrycode?: any) {
    // console.log(modal, countrycode);
    this.countrycode = countrycode;

    $(`#${modal}`).modal('show');
  }
}
