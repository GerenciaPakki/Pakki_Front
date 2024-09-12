import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, catchError, map, startWith, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-country',
  templateUrl: './input-country.component.html',
  styleUrls: ['./input-country.component.css'],
})
export class InputCountryComponent implements OnInit {
  //stateCtrl = new FormControl();
  @Input() stateCtrl: FormControl;
  @Input() label: string;
  @Input() tipo: Number;
  filteredStates: Observable<any>;
  @Output() PaisCambiado = new EventEmitter<any>();

  @Input() valid: boolean = false;

  states: any[] = [];

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((state) => {
        let filterValue = state?.toLowerCase();
        if (filterValue.length >= 3) {
          let body = { countryName: filterValue };
          return this.apiservice.post('cpc/co', body).pipe(
            map((res: any) => {
              this.states = res;
              return this.states.filter((state) =>
                state.CountryName.toLowerCase().includes(filterValue)
              );
            }),
            catchError((error) => {
              console.error('Error en la llamada al API:', error);
              return [];
            })
          );
        } else {
          this.states = [];
          return [];
        }
      })
    );
  }

  public countrySelect(value) {
    console.log(value);

    /* console.log('selecciono pais'); */
    /*  let obj = { CountryCode: value.CountryCode }; */
    this.PaisCambiado.emit({
      propiedad: 'pais_seleccionado',
      tipo: this.tipo,
      valor: value,
    });
  }
  onEnter(event: KeyboardEvent) {
    // Verificar si la tecla presionada es "Enter"
    if (event.key === 'Enter') {
      // Realizar la acción que desees cuando se presiona "Enter"
    }
  }
}
