import { Routes } from '@angular/router';
import { AllComponent } from './pages/all/all.component';

export const DiscountsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: AllComponent,
      },
    ],
  },
];
