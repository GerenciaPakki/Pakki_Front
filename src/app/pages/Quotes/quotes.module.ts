import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoterformsComponent } from './pages/quoterforms/quoterforms.component';
import { DatastepComponent } from './components/datastep/datastep.component';
import { CarddetailsComponent } from './components/carddetails/carddetails.component';
import { PrintdocumentComponent } from './components/printdocument/printdocument.component';
import { QuotesRoutes } from './quotes.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'src/app/modals/modal.module';
import { MetodosComponent } from './components/metodos/metodos.component';
import { MatChipsModule } from '@angular/material/chips';
import { TypesendbuttonComponent } from './components/typesendbutton/typesendbutton.component';
import { ExampleComponent } from './components/example/example.component';
@NgModule({
  declarations: [
    QuoterformsComponent,
    DatastepComponent,
    CarddetailsComponent,
    PrintdocumentComponent,
    MetodosComponent,
    TypesendbuttonComponent,
    ExampleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(QuotesRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    NouisliderModule,
    TagInputModule,
    NgbModule,
    ModalModule,
    MatChipsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CO',
    },
  ],
})
export class QuotesModule {}
