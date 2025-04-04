import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientModel, SaveClientModel } from '../client.model';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, NgxMaskDirective],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {

  @Input() client: SaveClientModel = {  name: '', email: '', phone: '' };
  @Output() clientSubmited = new EventEmitter<ClientModel>();

  constructor(private service: ClientsService) {

  }

  onSubmit(_: NgForm) {

    this.clientSubmited.emit(this.client);

  }

}

