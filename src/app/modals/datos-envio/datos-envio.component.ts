import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $;
@Component({
  selector: 'app-datos-envio',
  templateUrl: './datos-envio.component.html',
  styleUrls: ['./datos-envio.component.css'],
})
export class DatosEnvioComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Input() tipo: any; // 1. Origen, 2. Destino
  @Input() ciudad: FormControl;
  @Output() guardarCambios = new EventEmitter<any>();
  @Output() modalCerrado = new EventEmitter<any>();

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.formGroup) {
      this.ciudad = this.formGroup.get('ciudad') as FormControl;
    }
  }

  ngOnDestroy() {}

  public SaveData(modal: String) {
    if (this.tipo == 1) {
      let value =
        this.formGroup.get('nombre_pais_origen').value +
        ', ' +
        this.formGroup.get('ciudad').value +
        ', ' +
        this.formGroup.get('PostalCode').value;
      this.formGroup.patchValue({
        nombre_pais_origen: value,
      });
    }

    if (this.tipo == 2) {
      let value =
        this.formGroup.get('nombre_pais_destino').value +
        ', ' +
        this.ciudad.value +
        ', ' +
        this.formGroup.get('PostalCode').value;
      this.formGroup.patchValue({
        nombre_pais_destino: value,
      });
    }
    this.guardarCambios.emit({
      propiedad: 'guardar_datos',
      tipo: this.tipo,
      //valor: this.obj,
    });
    $(`#${modal}`).modal('hide');
  }

  public SetData() {
    this.formGroup.patchValue({ ciudad: '' });
    this.formGroup.patchValue({ PostalCode: '' });
    this.formGroup.patchValue({ StateCode: '' });
    this.formGroup.patchValue({ StateName: '' });
  }

  /**Evento manejador de Cambio de ciudad */
  public onCityChange(event) {
    console.log(event, 'ciudad seleccionada padre');
    this.formGroup.patchValue({ PostalCode: event.valor.PostalCodeCity });
    this.formGroup.patchValue({ StateCode: event.valor.StateCode });
    this.formGroup.patchValue({ StateName: event.valor.StateName });
    this.formGroup.patchValue({ Cam1: event.valor.Cam1 });
  }

  clearData() {
    if (this.tipo == 1) {
      this.formGroup.patchValue({
        nombre_pais_origen: this.formGroup.get('CountryName').value,
      });
      this.modalCerrado.emit({ tipo: 1, value: true });
    }

    if (this.tipo == 2) {
      this.formGroup.patchValue({
        nombre_pais_destino: this.formGroup.get('CountryName').value,
      });

      this.modalCerrado.emit({ tipo: 2, value: true });
    }

    this.SetData();
    $(`#envio`).modal('hide');
  }

  public searchDataPostalCode() {
    if (this.tipo == 1) {
      this.formGroup.patchValue({
        nombre_pais_destino: this.formGroup.get('nombre_pais_origen').value,
      });
    }

    if (this.tipo == 2) {
      this.formGroup.patchValue({
        nombre_pais_destino: this.formGroup.get('nombre_pais_destino').value,
      });
    }

    let body = {
      CountryCode: this.formGroup.get('CountryCode').value,
      PostalCodeCity: this.formGroup.get('PostalCode').value,
    };

    if (this.formGroup.get('PostalCode').value.length > 3) {
      this.apiservice.post('cpc/dc', body).subscribe(
        (res) => {
          if (res.length > 0) {
            this.formGroup.patchValue({ StateCode: res[0].StateCode });
            this.formGroup.patchValue({ ciudad: res[0].CityName });
            this.formGroup.patchValue({ StateName: res[0].StateName });
          }
        },
        (error) => {
          console.log('error al consultar por Codigo postal', error);
        }
      );
    }
  }
}
