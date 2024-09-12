import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { ComponentsModule } from '../components/components.module';
import { DatosEnvioComponent } from './datos-envio/datos-envio.component';
import { QrbancolombiaComponent } from './qrbancolombia/qrbancolombia.component';
import { DataphoneComponent } from './dataphone/dataphone.component';

@NgModule({
  declarations: [
    DatosEnvioComponent,
    QrbancolombiaComponent,
    DataphoneComponent,
  ],
  exports: [DatosEnvioComponent, QrbancolombiaComponent, DataphoneComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class ModalModule {}
