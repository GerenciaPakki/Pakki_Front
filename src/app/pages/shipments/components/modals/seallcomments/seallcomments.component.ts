import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
declare const $: any;
@Component({
  selector: 'app-seallcomments',
  templateUrl: './seallcomments.component.html',
  styleUrls: ['./seallcomments.component.css'],
})
export class SeallcommentsComponent implements OnInit {
  @Input() data: any = [];

  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {}

  public closeModal(modal: String) {
    $(`#${modal}`).modal('hide');
  }
}
