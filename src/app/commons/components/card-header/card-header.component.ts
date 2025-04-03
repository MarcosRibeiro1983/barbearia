import { Component } from '@angular/core';
import {MatCardModule, MatCardHeader, MatCardTitle } from '@angular/material/card'

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [MatCardModule, MatCardHeader, MatCardTitle],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss'
})
export class CardHeaderComponent {

}
