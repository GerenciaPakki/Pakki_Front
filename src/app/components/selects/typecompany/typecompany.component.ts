import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-typecompany',
  templateUrl: './typecompany.component.html',
  styleUrls: ['./typecompany.component.css'],
})
export class TypecompanyComponent implements OnInit {
  data = [];
  @Input() defaultValue: string = '';
  @Output() selectedCompany = new EventEmitter<any>();
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {
    this.getDataCompanies();
  }

  public getDataCompanies() {
    this.apiservice.get('tc').subscribe(
      (res) => {
        this.data = res.msg;
      },
      (error) => {
        console.log('Error Al Consultar Tipos de Compañia', error);
        this.sweetalertservice.errorMessage(
          'Error Al Consultar Tipos de Compañia'
        );
      }
    );
  }

  public clickCompany(item) {
    this.selectedCompany.emit({
      propiedad: 'compañia_seleccionada',
      valor: item,
    });
  }
}
