import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-searchbranchoffices',
  templateUrl: './searchbranchoffices.component.html',
  styleUrls: ['./searchbranchoffices.component.css'],
})
export class SearchbranchofficesComponent implements OnInit {
  @Input() branchofficectr: FormControl;
  @Input() nit: any;
  @Input() label: string;
  filteredbranch: Observable<any>;
  @Output() branchSelected = new EventEmitter<any>();
  branches: any[] = [];
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  ngOnInit(): void {}

  onKeyUp() {
    const filterValue = this.branchofficectr.value;

    if (filterValue.length >= 3 && this.nit) {
      this.branches = [];
      this.filteredbranch = of([]);
      const body = {
        nit: this.nit,
        branchOffice: filterValue,
      };

      this.apiservice.post('bs/brnofbus', body).subscribe(
        (res: any) => {
          // console.log(res.ViewBranchOfficeBus[0].branchoffices);
          this.branches = res.ViewBranchOfficeBus[0].branchoffices;
          this.filteredbranch = of(this.branches);
        },
        (error) => {
          console.error('Error en la consulta de manager', error);
          this.branches = [];
        }
      );
    } else {
      this.branches = [];
      this.filteredbranch = of([]);
    }
  }

  public branchSelect(branch: any) {
    this.branchSelected.emit({
      propiedad: 'branch_seleccionada',
      valor: branch,
    });
  }
}
