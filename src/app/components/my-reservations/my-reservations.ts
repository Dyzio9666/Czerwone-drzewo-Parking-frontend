import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { myReservationService } from '../../services/myreservationsapiservice';
export interface place{
  placeChoosen : number,
  date : string,
  id : number
}
@Component({
  selector: 'app-my-reservations',
  imports: [MatListModule , MatButtonModule , MatIconModule],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css',
})
export class MyReservations implements OnInit{
  constructor(
    private readonly myReservationService : myReservationService
  )
  {

  }
  username : string  | null= localStorage.getItem('user')
  reservations : place[] = [];
  loadData(){
    console.log(this.username)
    this.myReservationService.getMyReservations(this.username!).subscribe((res : place[]) =>{
      console.log(res)
      this.reservations = res;
    });
  }
  ngOnInit(): void {
    this.loadData();
  }
  deleteReservation(id : number){
    this.myReservationService.deleteReservation(id).subscribe({
      next: res =>{
        this.loadData()
      }
  });
  }
}
