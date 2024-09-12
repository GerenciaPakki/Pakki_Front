import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
declare const $: any;
@Component({
  selector: 'app-viewallshipments',
  templateUrl: './viewallshipments.component.html',
  styleUrls: ['./viewallshipments.component.css'],
})
export class ViewallshipmentsComponent implements OnInit {
  searchcompany = new FormGroup({
    businessname: new FormControl('', [Validators.required]), //Nombre de negocio
    guideNumber: new FormControl('', [Validators.required]), //Nombre de negocio
    businessnit: new FormControl('', [Validators.required]), //nit empresa
    business: new FormControl(''), // id del negocio
    brachOffice: new FormControl('', [Validators.required]),

    branchselected: new FormControl('', [Validators.required]),
    branchid: new FormControl(''),
  });

  businessNameChanged$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();
  dataShipments: Array<any> = [];
  filter = '';
  p: number = 1;
  carta = '';
  guia = '';
  proforma = '';
  datashipmentopen = {};
  comentarios: any = [];
  private timeout: any = null;
  estado: boolean = true;
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {
    // this.SendData();

    this.searchcompany
      .get('businessname')!
      .valueChanges.pipe(takeUntil(this.unsubscribe$)) // unsubscribe on component destruction
      .subscribe((value) => {
        this.businessNameChanged$.next(value);
        if (value.length > 0) {
          this.searchcompany.patchValue({ guideNumber: '' });
        }
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /** Sede Seleccionada */
  public BusinessSelect(event: any) {
    this.SendData();
  }

  public SendData() {
    let body = {
      brachOffice: this.searchcompany.get('businessname')?.value,
      guideNumber: this.searchcompany.get('guideNumber')?.value,
    };
    this.apiservice.post('sps/viewshipments', body).subscribe(
      (res: any) => {
        console.log('envios', res);
        if (res.msg.length == 0) {
          this.sweetalertservice.showNotification(
            'No se encontraron Coincidencias'
          );
        }
        this.dataShipments = res.msg;
      },
      (error) => {
        console.error('Error Al consultar Shipment', error);
        this.sweetalertservice.showNotification(
          error.error.msg ? error.error.msg : 'Error Al consultar Shipment '
        );
      }
    );
  }

  onKeyUpGuia(event: any) {
    this.searchcompany.patchValue({ businessname: '' });
    if (this.searchcompany.get('guideNumber')?.value.length > 1) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        console.log(this.searchcompany.value);
        this.SendData();
      }, 1000);
    }
  }

  /** Sucursal Seleccionada */
  public branchSelect(event: any) {
    console.log(event.valor);
    this.searchcompany.patchValue({
      branchid: event.valor._id,
    });
    console.log(this.searchcompany.value);
    this.SendData();
  }

  /** Sucursal Seleccionada */
  public commentCreated(event: any) {
    this.closeModal('generatecomment');
    this.SendData();
  }

  downloadPdf(ShipmentID: string) {
    let body = {
      ShipmentID,
    };
    console.log('====================================');
    console.log(body);
    console.log('====================================');

    this.apiservice.post('sps/viewpdf', body).subscribe(
      (res: any) => {
        console.log(res);
        if (res.msg.carta) {
          this.carta = res.msg.carta;
        }
        if (res.msg.guia) {
          this.guia = res.msg.guia;
        }
        if (res.msg.proforma) {
          this.proforma = res.msg.proforma;
        }
        this.openModal('view_docu');
      },
      (error) => {
        console.error('Error al enviar informacion de crear Comercial', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error Al Crear Comercial'
        );
      }
    );
  }

  public openModal(modal: String, shipment?: any) {
    if (shipment) {
      this.datashipmentopen = shipment;
    }
    $(`#${modal}`).modal('show');
  }

  getComentarios(shipment?: any) {
    // console.log('shipment', shipment);

    let body = {
      ShipmentID: shipment.ShipmentID,
    };
    this.apiservice.post('sps/vwshipcomm', body).subscribe(
      (res: any) => {
        // console.log('comentarios', res);
        if (res.ok == true) {
          this.comentarios = res.msg.comments;
          this.estado = res.msg.status == 'Abierto' ? true : false;
          this.openModal('seallcomment');
        }
      },
      (error) => {
        console.error('Error al consultar comentarios', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error Al consultar comentarios'
        );
      }
    );
  }

  public closeModal(modal: String) {
    $(`#${modal}`).modal('hide');
  }

  openDocument(url: any) {
    window.open(url, '_blank');
  }
}
