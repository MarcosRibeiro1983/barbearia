import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientTableComponent } from "../client-table/client-table.component";
import { ClientModel } from '../client.model';
import { Subscription } from 'rxjs';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss'
})
export class ListClientsComponent implements OnInit, OnDestroy {

  clients: ClientModel[] = [];
  private httpSubscriptions: Subscription[] = [];

  constructor(private service: ClientsService,
              private snackBarService: SnackbarManagerService
  ) {

  }

  ngOnInit(): void {

    this.httpSubscriptions.push(this.service.fetch().subscribe({
      next: (resp) => {
        this.clients = resp;
      }
    }))
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach( s => s.unsubscribe() );
  }

  update(client: ClientModel) {
    this.httpSubscriptions.push(this.service.update(client.id || 0, client).subscribe({
      next: (resp) => {
        this.snackBarService.show(`Usuário ${resp.name} atualizado com sucesso!`);
      }, error: (error) => {
        this.snackBarService.show(`Não foi possivel atualizar o usuário ${client.name} tente novamente por favor!`);
      }
    }))
  }

  onDelete(client: ClientModel) {
    this.httpSubscriptions.push(this.service.delete(client.id || 0).subscribe({
      next: () => {
        this.snackBarService.show(`Usuário ${client.name} removido com sucesso!`);
      }, error: (error) => {
        this.snackBarService.show(`Não foi possivel remover o usuário ${client.name} tente novamente por favor!`);
      } 
    }))
  }
}
