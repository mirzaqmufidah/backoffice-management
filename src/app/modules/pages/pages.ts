import { Component, OnInit, } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './pages.html',
  styleUrl: './pages.css'
})
export class Pages implements OnInit {
  isCollapsed = false;
  sidebarOpen = false;
  username: any;

  constructor(

  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
