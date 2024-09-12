import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  openDialog(componente: any): void {
    const dialogRef = this.dialog.open(componente, {
      width: '400px', // Dialog width
    });

    dialogRef.afterClosed().subscribe(result => {
      // Logic executed when the dialog is closed
      console.log(result);
    });
  }
}
