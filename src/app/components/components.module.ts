import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { ComponentsRoutes } from './components.routing';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';
import { InputnumericoComponent } from './inputs/inputnumerico/inputnumerico.component';
import { InputCountryComponent } from './inputs/input-country/input-country.component';
import { InputCityComponent } from './inputs/input-city/input-city.component';
import { ManagersComponent } from './selects/managers/managers.component';
import { TypecompanyComponent } from './selects/typecompany/typecompany.component';
import { InputNitComponent } from './inputs/input-nit/input-nit.component';
import { SearchbranchofficesComponent } from './inputs/searchbranchoffices/searchbranchoffices.component';
import { SearchprofileComponent } from './inputs/searchprofile/searchprofile.component';
import { InputciudadComponent } from './inputs/inputciudad/inputciudad.component';
import { InputNameBranch } from './inputs/inputNamebranch/inputNameBranch.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ButtonsComponent,
    GridSystemComponent,
    IconsComponent,
    NotificationsComponent,
    PanelsComponent,
    SweetAlertComponent,
    TypographyComponent,
    InputnumericoComponent,
    InputCountryComponent,
    InputCityComponent,
    ManagersComponent,
    TypecompanyComponent,
    InputNitComponent,
    SearchbranchofficesComponent,
    SearchprofileComponent,
    InputciudadComponent,
    InputNameBranch,
  ],
  exports: [
    InputnumericoComponent,
    InputCountryComponent,
    InputCityComponent,
    ManagersComponent,
    TypecompanyComponent,
    InputNitComponent,
    SearchbranchofficesComponent,
    SearchprofileComponent,
    InputciudadComponent,
    InputNameBranch,
  ],
})
export class ComponentsModule {}
