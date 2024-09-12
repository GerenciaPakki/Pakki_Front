import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthRoutes } from './auth.routing';
import { MaterialModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { LoginComponent } from './login/login.component';
import { ButtonpasswordComponent } from 'src/app/shared/buttonpassword/buttonpassword.component';
import { SearchsedesComponent } from './components/searchsedes/searchsedes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [LoginComponent, ButtonpasswordComponent, SearchsedesComponent],
})
export class AuthModule {}
