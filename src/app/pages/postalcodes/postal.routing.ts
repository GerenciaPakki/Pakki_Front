import { Routes } from '@angular/router';
import { ViewpostalComponent } from './pages/viewpostal/viewpostal.component';



export const PostalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: ViewpostalComponent ,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'view',
    pathMatch: 'full',
  },
];
