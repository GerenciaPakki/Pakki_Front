import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  // frmQuote: FormGroup;

  constructor() { 
    // this.frmQuote =  new FormGroup(
    //   { 
    //     Origen: new FormControl('', Validators.required),
    //     Destino: new FormControl('', Validators.required),
    //     Peso: new FormControl('', Validators.required),
    //     Largo: new FormControl('', Validators.required),
    //     Ancho: new FormControl('', Validators.required),
    //     Alto: new FormControl('', Validators.required),
    //     Valor: new FormControl('', Validators.required),
    //     FechaRecoleccion: new FormControl('', Validators.required),
    //     FechaEnvio: new FormControl('', Validators.required)
    //   }
    // )
  }

  ngOnInit(): void {
  }

}
