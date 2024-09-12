import { Routes } from '@angular/router';
import { UpdateBusinessComponent } from './pages/update-business/update-business.component';
import { AddcolaboratorComponent } from './pages/addcolaborator/addcolaborator.component';
import { AddcommercialComponent } from './pages/addcommercial/addcommercial.component';
import { UpdateBusinessBranchComponent } from './pages/update-business-branch/update-business-branch.component';
import { ViewallcompaniesComponent } from './pages/viewallcompanies/viewallcompanies.component';

export const BusinessRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'update',
        component: UpdateBusinessComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'addcolaborator',
        component: AddcolaboratorComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'addcommercial',
        component: AddcommercialComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'create-branch',
        component: UpdateBusinessBranchComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'viewall',
        component: ViewallcompaniesComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'create',
    pathMatch: 'full',
  },
];
