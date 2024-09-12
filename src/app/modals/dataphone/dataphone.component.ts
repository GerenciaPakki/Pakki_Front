import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dataphone',
  templateUrl: './dataphone.component.html',
  styleUrls: ['./dataphone.component.css'],
})
export class DataphoneComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() payselected = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  pay(modal: string) {
    console.log(this.formGroup.value);
    this.payselected.emit({ propiedad: 'pagar', valor: true, modal });
  }
}
