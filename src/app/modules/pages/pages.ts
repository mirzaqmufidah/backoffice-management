import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './pages.html',
  styleUrl: './pages.css'
})
export class Pages {
  isCollapsed = false;
  sidebarOpen = false;

  constructor(

  ) { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
