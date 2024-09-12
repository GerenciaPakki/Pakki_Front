import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/app.module';

import { BusinessRoutes } from './business.routing';
import { ComponentsModule } from 'src/app/components/components.module';

import { UpdateBusinessComponent } from './pages/update-business/update-business.component';
import { AddcolaboratorComponent } from './pages/addcolaborator/addcolaborator.component';
import { AddcommercialComponent } from './pages/addcommercial/addcommercial.component';
import { UpdateBusinessBranchComponent } from './pages/update-business-branch/update-business-branch.component';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ViewallcompaniesComponent } from './pages/viewallcompanies/viewallcompanies.component';
import { CompaniessearchPipe } from 'src/app/pipes/companiessearch.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfocompaniesComponent } from './pages/modals/infocompanies/infocompanies.component';
import { CreateBusinessComponent } from './pages/modals/create-business/create-business.component';

@NgModule({
  declarations: [
    CreateBusinessComponent,
    UpdateBusinessComponent,
    AddcolaboratorComponent,
    AddcommercialComponent,
    UpdateBusinessBranchComponent,
    ViewallcompaniesComponent,
    CompaniessearchPipe,
    InfocompaniesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(BusinessRoutes),
    ComponentsModule,
    NgxMaterialTimepickerModule,
    NgxPaginationModule,
  ],
  exports: [RouterModule],
})
export class businessModule {}
