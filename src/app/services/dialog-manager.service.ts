import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { YesNoDialogComponent } from '../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor( private dialog: MatDialog ) { }

  showYesNoDialog(component: ComponentType<YesNoDialogComponent>, data: {title: string, content: string}): Observable<any> {

    const dialogRef = this.dialog.open( component, { 
      width: '400px',
      data
    } )
    return dialogRef.afterClosed();
  }
}
