import { Routes } from '@angular/router';
import { ViewallshipmentsComponent } from './viewallshipments/viewallshipments.component';

export const ShipmentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'viewall',
        component: ViewallshipmentsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'viewall',
    pathMatch: 'full',
  },
];
