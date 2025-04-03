import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../../../clients/client.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../envivonments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  static URL = environment.apiUrl + 'clients';

  constructor(private http: HttpClient) { }


  save( client: ClientModel ):Observable<ClientModel> {
    return this.http.post<ClientModel>(ClientsService.URL, client);
  }

  update(id: number, client: ClientModel ):Observable<ClientModel> {
    return this.http.put<ClientModel>(ClientsService.URL + '/' + id, {client});
  }

  fetch(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>( ClientsService.URL );
  } 

  findById( id: number ):Observable<ClientModel> {
    return this.http.get<ClientModel>(ClientsService.URL + '/' + id );
  }

  delete( id: number ):Observable<void> {
    return this.http.delete<void>(ClientsService.URL + '/' + id );
  }
}
