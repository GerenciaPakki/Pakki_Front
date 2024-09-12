import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-typesendbutton',
  templateUrl: './typesendbutton.component.html',
  styleUrls: ['./typesendbutton.component.css'],
})
export class TypesendbuttonComponent implements OnInit {
  @Input() value: String;
  @Input() label: String;
  @Input() icon: String = '';

  @Input() isSelected: boolean;

  @Output() tiposeleccionado = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  selected() {
    console.log(this.value);
    console.log(this.isSelected);

    this.tiposeleccionado.emit({ value: this.value });
  }
}
