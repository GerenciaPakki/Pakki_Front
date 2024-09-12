import { Routes } from '@angular/router';
import { ViewallComponent } from './pages/viewall/viewall.component';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component: ViewallComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'view',
    pathMatch: 'full',
  },
];
