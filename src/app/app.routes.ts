import { Routes } from '@angular/router';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { SchedulesMonthComponent } from './schedules/schedules-month/schedules-month.component';

export const routes: Routes = [

    { path: 'clients/edit/:id', component: EditClientComponent,   data: {title: 'Atualizar cliente'} },
    { path: 'clients/new-client', component: NewClientComponent,   data: {title: 'Cadastrar cliente' }},
    { path: 'clients/list', component: ListClientsComponent,   data: {title: 'Clientes cadastrados' }},
    { path: 'schedules/month', component: SchedulesMonthComponent,   data: {title: 'Agendamentos' }},
    { path: '**', redirectTo: 'schedules/month' }

];
