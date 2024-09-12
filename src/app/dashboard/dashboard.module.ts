import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColumnsComponent } from './columns/columns.component';
import { ColumnspointComponent } from './columnspoint/columnspoint.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        BrowserAnimationsModule,

    ],
    declarations: [DashboardComponent, ColumnsComponent, ColumnspointComponent]
})

export class DashboardModule { }
