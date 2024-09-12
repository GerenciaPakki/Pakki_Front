import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-city',
  templateUrl: './input-city.component.html',
  styleUrls: ['./input-city.component.css'],
})
export class InputCityComponent implements OnInit, OnDestroy {
  /**Solo para Cotizador */
  @Input() formGroup: FormGroup;
  @Input() ciudad: FormControl;
  @Input() label: string;
  @Input() tipo: Number;
  filteredStates: Observable<any>;
  @Output() ciudadCambiada = new EventEmitter<any>();
  ciudades: any[] = [];
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  onKeyUp() {
    const filterValue = this.ciudad.value.toLowerCase();
    if (filterValue.length >= 3 && this.formGroup.get('CountryCode').value) {
      this.ciudades = [];
      this.filteredStates = of([]);
      const body = {
        countryCode: this.formGroup.get('CountryCode').value,
        cityName: filterValue,
      };

      this.apiservice.post('cpc/yt', body).subscribe(
        (res: any) => {
          this.ciudades = res;
          const filteredCities = this.ciudades.filter(
            (state) =>
              state.CityName.toLowerCase().includes(filterValue) ||
              state.StateName.toLowerCase().includes(filterValue)
          );
          this.filteredStates = of(filteredCities);
        },
        (error) => {
          console.error('Error en la llamada al API:', error);
          this.ciudades = [];
        }
      );
    } else {
      this.ciudades = [];
      this.filteredStates = of([]);
    }
  }

  public citySelect(value) {
    this.filteredStates = of([]);
    let body = {
      PostalCodeCity: value.PostalCodeCity,
      StateCode: value.StateCode,
      StateName: value.StateName,
      Cam1: value.Cam1,
    };
    this.ciudadCambiada.emit({
      propiedad: 'ciudad_seleccionada',
      tipo: this.tipo,
      valor: body,
    });
  }
}
