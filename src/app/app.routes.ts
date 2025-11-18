import { Routes } from '@angular/router';
import { Auth } from './components/auth/auth';
import { DatePicker } from './components/date-picker/date-picker';
import { Register } from './components/register/register';
import { PlacePicker } from './components/place-picker/place-picker';
import { AdminPanel } from './components/admin-panel/admin-panel';

export const routes: Routes = [
    {
        path : '',
        component : Auth
    },
    {
        path : 'date',
        component: DatePicker
    },
    {
        path: 'register',
        component : Register
    },
    {
        path : 'place-picker',
        component : PlacePicker
    },
    {
        path : 'admin',
        component : AdminPanel
    }
];
