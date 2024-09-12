import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inputnumerico',
  templateUrl: './inputnumerico.component.html',
  styleUrls: ['./inputnumerico.component.css'],
})
export class InputnumericoComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string = '';
  @Input() minLength: number = 1;
  @Input() maxLength: number = 50;
  constructor() {}

  ngOnInit(): void {}

  onInputChange(event: any) {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ''); // Filtrar solo números
    this.control.setValue(numericValue); // Actualizar el valor del FormControl
  }
}
