import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { QuoteComponent } from './pages/quote/quote.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dash',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'buss',
        loadChildren: () =>
          import('../app/pages/Business/business.module').then(
            (m) => m.businessModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'postal',
        loadChildren: () =>
          import('./pages/postalcodes/postalcodes.module').then(
            (m) => m.PostalcodesModule
          ),
      },
      {
        path: 'discounts',
        loadChildren: () =>
          import('./pages/discounts/discounts.module').then(
            (m) => m.DiscountsModule
          ),
      },
      {
        path: 'shipment',
        loadChildren: () =>
          import('./pages/shipments/shipments.module').then(
            (m) => m.ShipmentsModule
          ),
      },
      {
        path: 'quoter',
        loadChildren: () =>
          import('./pages/Quotes/quotes.module').then((m) => m.QuotesModule),
      },
      {
        path: 'quote',
        component: QuoteComponent,
      },
      {
        path: 'form',
        loadChildren: () =>
          import('../app/forms/forms.module').then((m) => m.Forms),
      },
      {
        path: '**',
        redirectTo: 'quotation',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
