import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.css'],
})
export class CarddetailsComponent implements OnInit {
  @Input() Pais_Origen;
  @Input() Pais_Destino;
  @Input() valor_declarado;
  @Input() Tipo;
  @Input() Peso;
  @Input() valor_asegurar;

  constructor() {}

  ngOnInit(): void {}
}
