import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css'],
})
export class ManagersComponent implements OnInit {
  @Input() manager: FormControl;
  @Input() label: string;
  filteredmanager: Observable<any>;
  @Output() managerSelected = new EventEmitter<any>();
  managers: any[] = [];
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {}

  onKeyUp() {
    const filterValue = this.manager.value;

    if (filterValue.length >= 3) {
      this.managers = [];
      this.filteredmanager = of([]);
      const body = {
        DocumentID: filterValue,
      };

      this.apiservice.post('cl/cc', body).subscribe(
        (res: any) => {
          //console.log(res);
          this.managers = res.msg;
          this.filteredmanager = of(this.managers);
        },
        (error) => {
          console.error('Error en la consulta de manager', error);
          this.managers = [];
        }
      );
    } else {
      this.managers = [];
      this.filteredmanager = of([]);
    }
  }

  public managerSelect(person: any) {
    this.managerSelected.emit({
      propiedad: 'manager_seleccionado',
      valor: person,
    });
  }
}
