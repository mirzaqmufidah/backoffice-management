import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Pages } from './modules/pages/pages';
import { routes as pagesRoutes } from './modules/pages/pages.routes'

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'admin', component: Pages, children: pagesRoutes }
];
