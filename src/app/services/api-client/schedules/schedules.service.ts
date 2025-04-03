import { Injectable } from '@angular/core';
import { environment } from '../../../../envivonments/environments';
import { HttpClient } from '@angular/common/http';
import { SaveSchedulesModel, SchaduleModel } from '../../../schedules/schedules.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  static URL = environment.apiUrl + 'schadules';

  constructor(private http: HttpClient) { }

  save( schadule: SaveSchedulesModel ):Observable<SaveSchedulesModel> {
    return this.http.post<SaveSchedulesModel>(SchedulesService.URL, schadule);
  }

  fetchInMonth(year: number, month: number): Observable<SchaduleModel> {
    return this.http.get<SchaduleModel>( SchedulesService.URL + '/' + year + '/' + month );
  } 

  delete( id: number ):Observable<void> {
    return this.http.delete<void>(SchedulesService.URL + '/' + id );
  }
}
