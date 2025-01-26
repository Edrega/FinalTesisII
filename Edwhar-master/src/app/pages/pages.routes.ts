import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { EjecucionServicioComponent } from './ejecucion-servicio/ejecucion-servicio.component';
import { OperacionComponentm } from './operacion/operacion.component';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    {
        path: 'ejecucion',
        component: EjecucionServicioComponent
    },{
        path: 'orden',
        component: OperacionComponentm
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
1