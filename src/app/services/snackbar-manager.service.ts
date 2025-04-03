import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackbarManagerService {

  constructor(private snackbar: MatSnackBar) { }


  show(message: string, action?: string, duration?: number): void {

    action = 'fechar';
    duration = 3000;
    this.snackbar.open(message, action, {duration, verticalPosition: 'top', horizontalPosition: 'right'})
  }
}
