import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-viewone',
  templateUrl: './viewone.component.html',
  styleUrls: ['./viewone.component.css']
})
export class ViewoneComponent implements OnInit {
  @Input() id: any;
  filter = '';
  p: number = 1;
  modifiedData: FormGroup;

  dataProvider;
  constructor(private apiservice: ApiService,
    public sweetalertservice: SweetalertService, public fb: FormBuilder,) { }

  ngOnInit(): void {

    this.modifiedData = this.fb.group({
      companyDiscountID: [''],
      Fee: [''],
      PakkiDiscount: [''],
      PakkiIncrease: [''],
      RateIncrease: [''],
      Weight: [''],
      dataID: [''],
      Country: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id) {

      if (this.id) {
        this.modifiedData.patchValue({ companyDiscountID: this.id })
        this.getDataUserbyDoc();
      }

    }
  }

  public sendData() {
    console.log(this.modifiedData.value);

    this.apiservice.post('cd/fid', this.modifiedData.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          confirmButtonText: 'Aceptar',
        });
      },
      (error) => {
        console.log('error al actualizar usuario', error);
        this.sweetalertservice.errorMessage('Error al actualizar usuario');
      }
    );
  }

  public removeData() {

  }

  public updateOne(index, data) {
    console.log(index, data);
    this.modifiedData.patchValue({ Weight: data.Weight })
    this.modifiedData.patchValue({ Fee: data.Fee })
    this.modifiedData.patchValue({ RateIncrease: data.RateIncrease })
    this.modifiedData.patchValue({ PakkiIncrease: data.PakkiIncrease })
    this.modifiedData.patchValue({ PakkiDiscount: data.PakkiDiscount })
    this.modifiedData.patchValue({ Country: data.Country })
    this.modifiedData.patchValue({ dataID: data._id })
    console.log("valor form", this.modifiedData.value);

    this.openModal('viewbyid')

  }

  getDataUserbyDoc() {
    if (this.id) {
      let body = { "companyDiscountID": this.id }

      this.apiservice.post('cd/fid', body).subscribe(
        (res) => {
          console.log("res", res.msg);
          console.log("res", res.msg[0].Data);
          this.dataProvider = res.msg[0].Data
        },
        (error) => {
          console.log('error al consultar data por provedor', error);
        }
      );
    }
  }


  public openModal(modal: String) {
    $(`#${modal}`).modal('show');
  }

  public closeModal(modal: String) {
    $(`#${modal}`).modal('hide');
  }

}
