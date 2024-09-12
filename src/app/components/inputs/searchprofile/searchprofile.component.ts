import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-searchprofile',
  templateUrl: './searchprofile.component.html',
  styleUrls: ['./searchprofile.component.css'],
})
export class SearchprofileComponent implements OnInit {
  /** Componente que busca por nit el Negocio */
  @Input() profilectr: FormControl;
  @Input() label: string;
  @Output() profileChange = new EventEmitter<any>();
  filteredProfiles: Observable<any>;
  data_profiles: any[] = [];
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {}

  onKeyUp() {
    const filterValue = this.profilectr.value;
    if (filterValue.length > 1) {
      this.data_profiles = [];
      this.filteredProfiles = of([]);
      const body = {
        profile: filterValue,
      };
      this.apiservice.post('pf/vpro', body).subscribe(
        (res: any) => {
          if (res) {
            this.data_profiles = res;
            this.filteredProfiles = of(this.data_profiles);
          }
        },
        (error) => {
          console.error('Error en la consulta de NIT de Negocio:', error);
          this.data_profiles = [];
        }
      );
    } else {
      this.data_profiles = [];
      this.filteredProfiles = of([]);
    }
  }

  public profileSelect(value) {
    this.profileChange.emit({ propiedad: 'perfil_seleccionado', valor: value });
  }
}
