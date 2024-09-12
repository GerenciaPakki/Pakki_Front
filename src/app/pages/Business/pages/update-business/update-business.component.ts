import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-business',
  templateUrl: './update-business.component.html',
  styleUrls: ['./update-business.component.css'],
})
export class UpdateBusinessComponent implements OnInit {
  businessupdate = new FormGroup({
    businessname: new FormControl('', [Validators.required]), // nombre comercial del negocio
    mainaddress: new FormControl(''), // direccion principal
    companytype: new FormControl(''),
    phonenumber: new FormControl(''),
    phonedescription: new FormControl(''),
    cellphonenumber: new FormControl(''),
    cellphonedescription: new FormControl(''),
    email: new FormControl('', [
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]), // no se puede editar
    branchoffices: new FormControl(''),
    city: new FormControl(''), // selector ciudad
    citycode: new FormControl(''),
    state: new FormControl(''),
    observation: new FormControl(''),
    creatorUser: new FormControl(''),
  });

  nitbusiness;

  country = new FormGroup({
    countryCode: new FormControl('CO'),
  });

  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    let creator = this.userservice.getAllInfoUser();
    console.log(creator);
    this.businessupdate.patchValue({ creatorUser: creator.collaborator?.id });
  }

  /**
   * The function "onCityChange" logs the event object, sets the "city" and "citycode" values in the
   * "businesscreate" form to the selected city's StateName and StateCode respectively.
   * @param {any} event - The event parameter is an object that represents the event that triggered the
   * onCityChange function. It contains information about the event, such as the value selected by the
   * user.
   */
  public onCityChange(event: any) {
    this.businessupdate.patchValue({ city: event.valor.CityName });
    this.businessupdate.patchValue({ citycode: event.valor.StateCode });
    this.businessupdate.patchValue({
      state: event.valor.StateName + '-' + event.valor.StateCode,
    });
  }

  public SendData() {
    console.log(this.businessupdate.value);

    this.apiservice
      .put(`bs/${this.nitbusiness}`, this.businessupdate.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(res.msg, '', 'success');
        },
        (error) => {
          console.error('Error al enviar informacion de crear Business', error);
        }
      );
  }

  public BusinessSelect(event: any) {
    console.log(event.valor.busDataDB, 'Recibido en el padre');
    this.businessupdate.patchValue({
      mainaddress: event.valor.busDataDB.business?.mainaddress,
    });
    this.businessupdate.patchValue({
      phonenumber: event.valor.busDataDB.business?.phone.number,
    });
    this.businessupdate.patchValue({
      phonedescription: event.valor.busDataDB.business?.phone.description,
    });
    this.businessupdate.patchValue({
      cellphonenumber: event.valor.busDataDB.business?.cellphone.number,
    });
    this.businessupdate.patchValue({
      cellphonedescription: event.valor.busDataDB.business?.phone.description,
    });
    this.businessupdate.patchValue({
      email: event.valor.busDataDB.business?.email,
    });
    this.businessupdate.patchValue({
      branchoffices: event.valor.busDataDB.business?.branchoffices,
    });
    this.businessupdate.patchValue({
      city: event.valor.busDataDB.business?.city,
    });
    this.businessupdate.patchValue({
      citycode: event.valor.busDataDB.business?.citycode,
    });
    this.businessupdate.patchValue({
      state: event.valor.busDataDB.business?.state,
    });
    this.businessupdate.patchValue({
      observation: event.valor.busDataDB.observation,
    });

    this.nitbusiness = event.valor.busDataDB.business?.irs_nit;

    /**Logica Para actualizar compañia*/
    this.getCompany(event.valor.busDataDB.business.companytype);
  }

  selectedCompany(event: any) {
    /* console.log(event, 'compañia select'); */
    this.businessupdate.patchValue({ companytype: event.valor._id });
  }

  getCompany(nombre: String) {
    this.apiservice.get('tc').subscribe(
      (res) => {
        res.msg.forEach((element) => {
          if (element.name == nombre) {
            this.businessupdate.patchValue({ companytype: element._id });
            return;
          }
        });
      },
      (error) => {
        console.log('Error Al Consultar Tipos de Compañia', error);
        this.sweetalertservice.errorMessage(
          'Error Al Consultar Tipos de Compañia'
        );
      }
    );
  }
}
