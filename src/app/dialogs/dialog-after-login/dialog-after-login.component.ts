import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-after-login',
  templateUrl: './dialog-after-login.component.html',
  styleUrls: ['./dialog-after-login.component.css']
})
export class DialogAfterLoginComponent implements OnInit {

  selectedOption: string | null = null;

  constructor(dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  /*  onNoClick(): void {
     this.dialogRef.
   } */

}
