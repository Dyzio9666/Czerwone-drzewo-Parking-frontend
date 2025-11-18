import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel implements OnInit {
  constructor(
    private readonly router : Router,
  ){

  }


  ngOnInit(): void {
      if(localStorage.getItem('role') !== 'admin'){
          this.router.navigate(['/'])
      }
  }
}
