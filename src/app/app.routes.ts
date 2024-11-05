import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CocheComponent } from './component/coche/coche.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Pagina Principal',
    },
    {
        path: 'coche',
        component: CocheComponent,
        title:'Soy coche'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
