import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, filter, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-namebranch',
  templateUrl: './inputNameBranch.component.html',
})
export class InputNameBranch implements OnInit {
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

    if (filterValue.length > 3) {
      this.data_aliados = [];
      this.filteredAliados = of([]);

      let body = {
        brachOffice: filterValue,
        guideNumber: '',
      };
      this.apiservice.post('bs/bussearch', body).subscribe(
        (res: any) => {
          this.dataresponse = res;
          res.tradenames.forEach((element) => {
            let obj = {
              name: element,
              value: element,
            };
            this.data_aliados.push(obj);
          });

          this.filteredAliados = of(this.data_aliados);
        },
        (error) => {
          console.error('Error en la consulta de Nombre de Negocio:', error);
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
      valor: value,
    });
  }
}
