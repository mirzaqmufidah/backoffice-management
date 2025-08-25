import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Home } from './modules/pages/home/home';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'home', component: Home }
];
