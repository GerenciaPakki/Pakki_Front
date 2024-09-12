import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-generatecomment',
  templateUrl: './generatecomment.component.html',
  styleUrls: ['./generatecomment.component.css'],
})
export class GeneratecommentComponent implements OnInit {
  @Input() data: any = {};
  comment: string = '';
  @Output() commentCreated = new EventEmitter<any>();
  @Input() estado = true;
  constructor(
    private apiservice: ApiService,
    public sweetalertservice: SweetalertService
  ) {}

  public createComment() {
    this.data.comment = this.comment;
    this.data.status = this.estado == true ? 'Abierto' : 'Cerrado';
    this.apiservice.post('sps/shipcomm', this.data).subscribe(
      (res: any) => {
        // console.log(res);
        this.sweetalertservice.showNotification(res.msg);
        this.comment = '';
        this.commentCreated.emit({
          propiedad: 'comment_created',
          valor: true,
        });
      },
      (error) => {
        console.error('Error al crear comentario', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error al crear comentario'
        );
      }
    );
  }

  selectPickup(value?: boolean) {
    this.estado = value;
  }

  ngOnInit(): void {}
}
