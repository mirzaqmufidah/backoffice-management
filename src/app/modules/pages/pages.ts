import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './pages.html',
  styleUrl: './pages.css'
})
export class Pages {
  isCollapsed = false;

  constructor(

  ) { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
