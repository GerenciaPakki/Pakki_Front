import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAfterLoginComponent } from './dialog-after-login/dialog-after-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [DialogAfterLoginComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule

  ]
})
export class DialogModule { }
