import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-printdocument',
  templateUrl: './printdocument.component.html',
  styleUrls: ['./printdocument.component.css'],
})
export class PrintdocumentComponent implements OnInit {
  @Input() guia = '';
  @Input() email = '';
  hora = '';
  jornada = '';
  @Input() doc = '';
  @Input() proforma = '';
  @Input() carta = '';
  @Input() codigointerno = '';
  @Input() ConfirmationNumber = '';
  constructor() {}

  ngOnInit(): void {
    this.doc = localStorage.getItem('doc');
    this.proforma = localStorage.getItem('proforma');
    this.carta = localStorage.getItem('carta');
    this.guia = localStorage.getItem('guia');
    this.email = localStorage.getItem('email');
    this.hora = localStorage.getItem('hora');
    this.jornada = localStorage.getItem('jornada');
    this.codigointerno = localStorage.getItem('codigointerno');
  }

  public download(url: any) {
    /* let url =
      'https://pakki.click/guias/fdx/guia_fdxco-d77048d3-198c-413e-86bb-c1ac4deb8376.pdf'; */
    window.open(`${url}`, '_blank');
    //window.open(`${url}`, '_blank');
  }
}
