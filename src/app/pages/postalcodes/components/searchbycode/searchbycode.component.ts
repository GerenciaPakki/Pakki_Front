import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-searchbycode',
  templateUrl: './searchbycode.component.html',
  styleUrls: ['./searchbycode.component.css'],
})
export class SearchbycodeComponent implements OnInit {
  @Input() countrycode: FormControl; //codigo pais
  @Input() postalcode: FormControl; //codigo postal
  @Input() label: string;
  filteredresults: Observable<any>;
  @Output() codigoCambiado = new EventEmitter<any>();
  ciudades: Array<any> = [];
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {}
  ngOnDestroy() {}

  onKeyUp() {
    const filterValue = this.postalcode.value;
    //console.log(filterValue);
    // console.log('codigo pais en consulta', this.countrycode.value);

    if (filterValue.length >= 3 && this.countrycode.value) {
      this.ciudades = [];
      this.filteredresults = of([]);
      let body = {
        CountryCode: this.countrycode.value,
        postalcode: this.postalcode.value,
      };

      this.apiservice.post('dcc/ptal', body).subscribe(
        (res: any) => {
          this.ciudades = res.postalCodeDB;
          const filteredCities = this.ciudades?.filter(
            (state) => state.PostalCodeCity.toLowerCase().includes(filterValue)
            // || state.StateName.toLowerCase().includes(filterValue)
          );
          this.filteredresults = of(filteredCities);
        },
        (error) => {
          console.error('Error en la llamada al API:', error);
          this.ciudades = [];
        }
      );
    } else {
      this.ciudades = [];
      this.filteredresults = of([]);
    }
  }

  public citySelect(value) {
    this.filteredresults = of([]);
    this.codigoCambiado.emit({
      propiedad: 'codigo_seleccionado',
      valor: value,
    });
  }
}
