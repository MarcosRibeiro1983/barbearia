import { Component, OnDestroy } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientFormComponent } from "../client-form/client-form.component";
import { ClientModel, SaveClientModel } from '../client.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss'
})
export class NewClientComponent implements OnDestroy {

  private httpSubscription?: Subscription;

  constructor(private service: ClientsService,
              private serviceSnackBar: SnackbarManagerService,
              private router: Router
  ) {

  }

  ngOnDestroy(): void {
    if(this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }

  }


  onSubmitClient(value: SaveClientModel) {

    const { ...request } = value;
    
    this.httpSubscription = this.service.save(request).subscribe({
      next: (result) => {
        this.serviceSnackBar.show('Usuário' + result.name + ' cadastrado com sucesso!');
        this.router.navigate(['clients/list'])
      }, error: (error) => {
        alert('Error ' + error);
      }
    })

  }

}
