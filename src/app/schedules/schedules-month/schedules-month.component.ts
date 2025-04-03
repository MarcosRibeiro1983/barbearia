import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SchedulesCalendarComponent } from "../schedules-calendar/schedules-calendar.component";
import { ClientAppointment, SaveSchedulesModel, SchaduleModel, SelectedClient } from '../schedules.model';
import { SchedulesService } from '../../services/api-client/schedules/schedules.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientModel } from '../../clients/client.model';

@Component({
  selector: 'app-schedules-month',
  standalone: true,
  imports: [SchedulesCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.scss'
})
export class SchedulesMonthComponent implements OnInit, OnDestroy {


clients: ClientModel[] = [];
monthSchedule!: SchaduleModel;
subscriptions!: Subscription[];
selectedDate?: Date;

constructor(private service: SchedulesService,
            private clientService: ClientsService,
            private snackBarService: SnackbarManagerService
 ) {

}

  ngOnInit(): void {
    const currentDate = new Date();
    this.subscriptions.push( this.clientService.fetch().subscribe({
      next: (clients) => {
        this.clients = clients;                
      }
    } ) )
    this.buildSchedule(currentDate);
  }
 

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onScheduleClient(schedule: SaveSchedulesModel) {
    if( schedule.startAt && schedule.endAt && schedule.clientId ) {
      const request: SaveSchedulesModel = {
        startAt: schedule.startAt, endAt: schedule.endAt, clientId: schedule.clientId
      }

      this.subscriptions.push( this.service.save(request).subscribe() )
    }
    
  }
  onConfirmDelete(schedule: ClientAppointment) {
    this.subscriptions.push( this.service.delete(schedule.id).subscribe({
      next: () => {
        this.snackBarService.show('Agendamento realizado com sucesso!');
        if(this.selectedDate) {
          this.buildSchedule(this.selectedDate);
        }
      }
    })  )
    
  }

  onChangeDate(date: Date) {
    this.selectedDate = date;
    this.buildSchedule(date);
  }

  private buildSchedule(currentDate: Date) {
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(this.service.fetchInMonth(year, month).subscribe(data => this.monthSchedule = data));
  }

}
