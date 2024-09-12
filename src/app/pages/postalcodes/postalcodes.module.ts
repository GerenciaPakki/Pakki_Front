import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewpostalComponent } from './pages/viewpostal/viewpostal.component';
import { PostalRoutes } from './postal.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { CountrysearchPipe } from 'src/app/pipes/countrysearch.pipe';
import { CreatepostalComponent } from './pages/createpostal/createpostal.component';
import { SearchonepostalComponent } from './pages/searchonepostal/searchonepostal.component';
import { SearchbycodeComponent } from './components/searchbycode/searchbycode.component';
import { ClonepostalcodeComponent } from './components/clonepostalcode/clonepostalcode.component';

@NgModule({
  declarations: [ViewpostalComponent, CountrysearchPipe, CreatepostalComponent, SearchonepostalComponent, SearchbycodeComponent, ClonepostalcodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PostalRoutes),
    ComponentsModule,
    MaterialModule,
    NgxPaginationModule,
    ComponentsModule,
  ],
})
export class PostalcodesModule {}
