import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule } from '@angular/material/menu'
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

  constructor(private router: Router) {

  }

  navigationTo(route: string) {
    this.router.navigate([route]);
  }
}
