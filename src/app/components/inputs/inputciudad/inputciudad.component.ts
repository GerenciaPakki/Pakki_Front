import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inputciudad',
  templateUrl: './inputciudad.component.html',
  styleUrls: ['./inputciudad.component.css'],
})
export class InputciudadComponent implements OnInit {
  /**Generico */
  @Input() countrycode: FormControl; //codigo pais
  @Input() ciudad: FormControl;
  @Input() showpostal: boolean = true;
  @Input() label: string;
  filteredStates: Observable<any>;
  @Output() ciudadCambiada = new EventEmitter<any>();
  ciudades: any[] = [];
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  onKeyUp() {
    const filterValue = this.ciudad.value;
    // console.log(this.ciudad.value);

    if (filterValue.length >= 3 && this.countrycode.value) {
      this.ciudades = [];
      this.filteredStates = of([]);
      const body = {
        countryCode: this.countrycode.value,
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
    // console.log(value);
    let body = {
      PostalCodeCity: value.PostalCodeCity,
      StateCode: value.StateCode,
      CityName: value.CityName,
      StateName: value.StateName,
    };
    this.ciudadCambiada.emit({
      propiedad: 'ciudad_seleccionada',
      valor: body,
    });
  }
}
