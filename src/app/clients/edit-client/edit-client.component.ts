import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientFormComponent } from "../client-form/client-form.component";
import { ClientModel } from '../client.model';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent implements OnInit, OnDestroy {

  httpSubscription?: Subscription;
  client: ClientModel = { id: 0, name: '', email: '', phone: ''};

  constructor(private service: ClientsService,
              private serviceSnackBar: SnackbarManagerService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {}

  
  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(!id) {
      this.serviceSnackBar.show('Não foi possivel recuperar os dados do cliente');
      this.router.navigate(['clients/list'])
      return;
    }

    this.httpSubscription = this.service.findById(Number(id)).subscribe({
      next: (resp) => {
        this.client = resp;
        this.serviceSnackBar.show('Os dados do cliente foram recuperados!');
      }
    })
    
  }

  ngOnDestroy(): void {
    if(this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitClient(value: ClientModel) {

    const { id, ...request } = value;

    if(id) {
      this.httpSubscription = this.service.update(id, request).subscribe({
        next: (result) => {
          this.serviceSnackBar.show('Usuário' + result.name + ' atualizado com sucesso!');
          this.router.navigate(['clients/list'])
        }, error: (error) => {
          alert('Error ' + error);
        }
      })
      return
    }

  }
}
