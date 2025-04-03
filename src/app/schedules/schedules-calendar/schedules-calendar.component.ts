import { ClientAppointment, SaveSchedulesModel, SchaduleModel, SelectedClient } from './../schedules.model';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogManagerService } from '../../services/dialog-manager.service';
import { CommonModule } from '@angular/common';
import { YesNoDialogComponent } from '../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';
import { ClientModel } from '../../clients/client.model';
import { MatDatepickerModule, MatCalendar } from '@angular/material/datepicker'
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-schedules-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatPaginatorModule,
     MatTooltipModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCalendar, MatTimepickerModule],
  templateUrl: './schedules-calendar.component.html',
  styleUrl: './schedules-calendar.component.scss',
  providers: [
    provideNativeDateAdapter(),
  ]
})


export class SchedulesCalendarComponent implements OnInit, AfterViewInit, OnChanges {

  subscription!: Subscription;

  dataSource!: MatTableDataSource<ClientAppointment>; 

  @ViewChild(MatPaginator) pagination!: MatPaginator;
  displayedColumns: string[] = ['startAt', 'endAt', 'clientId', 'actions'];

  addSchedules: boolean = false;
  newSchedules: SaveSchedulesModel = {startAt: undefined, endAt: undefined, clientId: undefined };

  clientSelectedForm = new FormControl();

  private _selected: Date = new Date();

  @Input() monthSchedule!: SchaduleModel;
  @Input() clients: ClientModel[] = [];

  @Output() onChangeDate = new EventEmitter<Date>();
  @Output() onScheduleClient = new EventEmitter<SaveSchedulesModel>();
  @Output() onConfirmDelete = new EventEmitter<ClientAppointment>();

  constructor(private dialogService: DialogManagerService) {

  }

  get selected(): Date {
    return this._selected
  } 

  set selected(selected: Date) {
    if( this._selected.getTime() === selected.getTime() ) {
      this.onChangeDate.emit(selected);
      this.buildTable();
      this._selected = selected;
    }
  }

  ngOnInit(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    if(this.dataSource && this.pagination) {
      this.dataSource.paginator = this.pagination;
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['monthSchedule'] && this.monthSchedule) {
      this.buildTable() 
    
    }
  }

  buildTable() {
    const appointments = this.monthSchedule.appointments.filter(d => 
      this.monthSchedule.year === this._selected.getFullYear() &&
      this.monthSchedule.month - 1 === this._selected.getMonth() &&
      d.day == this._selected.getDate()
    )
    this.dataSource = new MatTableDataSource<ClientAppointment>(appointments);
    this.checkPagination();
  }

  onTimeChange(time: any) {
    const endAt = new Date(time);
    endAt.setHours(time.getHours() + 1);
    this.newSchedules.endAt = endAt;
  }

  delete(schedule: ClientAppointment) {

    this.subscription = this.dialogService.showYesNoDialog( YesNoDialogComponent,
      {title: 'Exclusão de agendamento', content: `Tem certeza que deseja excluir o agendamento de: ${schedule.clientName}` } )
      .subscribe(result => {
        if(result) {
          this.onConfirmDelete.emit(result);
          const updateList = this.dataSource.data.filter( c => c.id != schedule.id );
          this.dataSource = new MatTableDataSource<ClientAppointment>(updateList);
        }
        this.checkPagination();
      }
    )
  }

  checkPagination() {
    if(this.pagination) {
      this.dataSource.paginator = this.pagination;
    }
  }

  onSubmit(form: NgForm) {
    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);
    startAt.setHours(this.newSchedules.startAt!.getHours(), this.newSchedules.startAt!.getMinutes());
    endAt.setHours(this.newSchedules.endAt!.getHours(), this.newSchedules.endAt!.getMinutes());

    const save: ClientAppointment = {
      id: 0,
      day: this._selected.getDate(),
      startAt,
      endAt,
      clientId: this.newSchedules.clientId!,
      clientName: this.clients.find( c => c.id === this.newSchedules.clientId )?.name!

    }
    this.onScheduleClient.emit(save)
    this.buildTable()
    form.resetForm()
    this.newSchedules = {startAt: undefined, endAt: undefined, clientId: undefined };
  }
}
