import { Routes } from '@angular/router';
import { Auth } from './components/auth/auth';
import { DatePicker } from './components/date-picker/date-picker';
import { Register } from './components/register/register';

export const routes: Routes = [
    {
        path : 'login',
        component : Auth
    },
    {
        path : 'date',
        component: DatePicker
    },
    {
        path: 'register',
        component : Register
    }
];
