import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, filter, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-nit',
  templateUrl: './input-nit.component.html',
  styleUrls: ['./input-nit.component.css'],
})
export class InputNitComponent implements OnInit {
  /** Componente que busca por nit el Negocio */
  @Input() nitctr: FormControl;
  @Input() label: string;
  @Output() aliadoCambiado = new EventEmitter<any>();
  filteredAliados: Observable<any>;
  data_aliados: any[] = [];
  dataresponse;
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {}

  onKeyUp() {
    const filterValue = this.nitctr.value;
    // console.log(filterValue);

    if (filterValue.length > 1) {
      this.data_aliados = [];
      this.filteredAliados = of([]);
      const body = {
        BusinessNit: filterValue,
      };
      this.apiservice.post('bs/busonenit', body).subscribe(
        (res: any) => {
          console.log('res bus', res);
          if (res.busDataDB) {
            this.dataresponse = res;
            let obj = {
              name: res?.busDataDB?.business?.businessname,
              value: res?.busDataDB?.business?.businessname,
            };
            this.data_aliados.push(obj);
            this.filteredAliados = of(this.data_aliados);
          }
        },
        (error) => {
          console.error('Error en la consulta de NIT de Negocio:', error);
          this.data_aliados = [];
        }
      );
    } else {
      this.data_aliados = [];
      this.filteredAliados = of([]);
    }
  }

  public AliadoSelect(value) {
    this.filteredAliados = of([]);
    /*  console.log(value); */
    this.aliadoCambiado.emit({
      propiedad: 'aliado_seleccionado',
      valor: this.dataresponse,
    });
  }
}
