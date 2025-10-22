import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/all',
  },
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products-grid/products-grid'),
  },
  {
    path: 'whishlist',
    loadComponent: () => import('./pages/my-whishlist/my-whishlist'),
  },
];
