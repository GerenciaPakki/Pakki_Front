import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutes } from './users.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ViewallComponent } from './pages/viewall/viewall.component';
import { FilterusersPipe } from 'src/app/pipes/filterusers.pipe';

import { CreateuserComponent } from './pages/createuser/createuser.component';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ViewallComponent,
    FilterusersPipe,
    CreateuserComponent,
    UpdateuserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UsersRoutes),
    ComponentsModule,
    MaterialModule,
    NgxPaginationModule,
    ComponentsModule,
  ],
})
export class UsersModule {}
