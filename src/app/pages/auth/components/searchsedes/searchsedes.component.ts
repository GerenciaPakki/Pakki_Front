import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';

@Component({
  selector: 'app-searchsedes',
  templateUrl: './searchsedes.component.html',
  styleUrls: ['./searchsedes.component.css'],
})
export class SearchsedesComponent implements OnInit {
  sede = new FormControl('');
  @Input() label: string = '';
  @Input() sedes: any[];
  filteredSedes: Observable<any>;

  @Output() sedeCambiada = new EventEmitter<any>();

  constructor() {
    console.log('this.sedes:', this.sedes);
    this.filteredSedes = this.sede.valueChanges.pipe(
      map((value) => (value ? this._filterSedes(value) : this.sedes))
    );
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Este método se llama cada vez que cambia una propiedad de entrada, como 'sedes'.
    // Puedes verificar si 'sedes' ha cambiado y realizar acciones en consecuencia.
    if (changes.sedes) {
      this.filteredSedes = this.sede.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterSedes(value))
      );
    }
  }

  private _filterSedes(value: string) {
    if (!this.sedes) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.sedes.filter((sede) =>
      sede.tradename.toLowerCase().includes(filterValue)
    );
  }
  public sedeSelect(value) {
    this.sedeCambiada.emit({
      propiedad: 'sede_seleccionada',
      value: value,
    });
  }
}
