import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-qrbancolombia',
  templateUrl: './qrbancolombia.component.html',
  styleUrls: ['./qrbancolombia.component.css'],
})
export class QrbancolombiaComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() payselected = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  pay(modal: string) {
    console.log(this.formGroup.value);
    this.payselected.emit({ propiedad: 'pagar', valor: true, modal });
  }
}
