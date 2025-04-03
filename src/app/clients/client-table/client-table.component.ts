import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientModel } from '../client.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule  } from '@angular/material/paginator'
import { Subscription } from 'rxjs';
import { DialogManagerService } from '../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { CustomPaginator } from './custom-paginator';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatTooltipModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  providers: [ { provide: MatPaginatorIntl, useClass: CustomPaginator }]
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy{

  @Input()
  clients: ClientModel[] = [];
  dataSource!: MatTableDataSource<ClientModel>; 

  @ViewChild(MatPaginator) pagination!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  private dialogManagerSubscriptions?: Subscription; 

  @Output()
  confirmDelete = new EventEmitter<ClientModel>();

  @Output()
  update = new EventEmitter<ClientModel>();

  constructor(private service: ClientsService,
              private dialog: DialogManagerService
  ) {}
  
  ngOnDestroy(): void {
    if(this.dialogManagerSubscriptions) {
      this.dialogManagerSubscriptions.unsubscribe();
    }
  }
  ngOnChanges(changes: any): void {
    if(changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModel>(this.clients)
      if(this.pagination) {
        this.dataSource.paginator = this.pagination;
      }
    }
  }

  ngAfterViewInit(): void {
   this.dataSource.paginator = this.pagination;
  }

  updateClient(client: ClientModel) {
    this.update.emit(client);
  }

  deleteClient(client: ClientModel) {
   this.dialog.showYesNoDialog(YesNoDialogComponent, {
    title: 'Exclusão de cliente', 
    content: `Tem certeza que deseja excluir o cliente ${client.name} ?`})
    .subscribe( result => {
      if(result) {
        this.confirmDelete.emit(client);
        const updateList = this.dataSource.data.filter( c => c.id != client.id );
        this.dataSource = new MatTableDataSource<ClientModel>(updateList);
      }
    })
  }

  formatPhone(phone: string) {
    return `( ${phone.substring(0, 2)} ) ${phone.substring(2, 7)} - ${phone.substring(7)} `
  }

}
