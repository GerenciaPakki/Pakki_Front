import { Routes } from '@angular/router';
import { QuoterformsComponent } from './pages/quoterforms/quoterforms.component';

export const QuotesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'quotation',
        component: QuoterformsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'quotation',
    pathMatch: 'full',
  },
];
