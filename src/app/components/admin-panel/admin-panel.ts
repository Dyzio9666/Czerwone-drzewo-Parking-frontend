import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { adminApiService, reservation } from '../../services/adminapiservice';
@Component({
  selector: 'app-admin-panel',
  imports: [MatListModule, MatIconModule , MatButtonModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel implements OnInit {
  constructor(
    private readonly router : Router,
    private readonly adminApiService : adminApiService
  ){

  }
  reservations : reservation[]  = [];



  ngOnInit(): void {
      if(localStorage.getItem('role') !== 'admin'){
          this.router.navigate(['/'])
      }
      
      this.reservations = this.adminApiService.getAllReservations();  
      console.log(this.reservations)
     
  }
}
