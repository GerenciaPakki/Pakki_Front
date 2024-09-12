import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentRoutes } from './shipments.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalModule } from 'src/app/modals/modal.module';
import { ViewallshipmentsComponent } from './viewallshipments/viewallshipments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GeneratecommentComponent } from './components/modals/generatecomment/generatecomment.component';
import { SeallcommentsComponent } from './components/modals/seallcomments/seallcomments.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchshipmentPipe } from 'src/app/pipes/searchshipment.pipe';

@NgModule({
  declarations: [
    ViewallshipmentsComponent,
    GeneratecommentComponent,
    SeallcommentsComponent,
    SearchshipmentPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ShipmentRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    NouisliderModule,
    TagInputModule,
    NgbModule,
    ModalModule,
    NgxPaginationModule,
    MatFormFieldModule,
  ],
})
export class ShipmentsModule {}
