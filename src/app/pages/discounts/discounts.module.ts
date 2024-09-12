import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './pages/all/all.component';
import { DiscountsRoutes } from './discounts.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterprovidersPipe } from 'src/app/pipes/filterproviders.pipe';
import { ViewoneComponent } from './pages/viewone/viewone.component';


@NgModule({
  declarations: [AllComponent, FilterprovidersPipe, ViewoneComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DiscountsRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxPaginationModule,
  ],
})
export class DiscountsModule { }
