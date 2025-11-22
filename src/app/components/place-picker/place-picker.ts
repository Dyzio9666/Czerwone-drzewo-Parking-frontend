import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { sendDateInfo } from '../../services/sendDateInfoservice';
import { firstValueFrom, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';
interface parkingSpace {
  id : number,
  status : boolean,
  clicked?: boolean,
  isVIP?: boolean
}

function changeDateFormat(dateString: string): string {
  const [month, day,year] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
@Component({
  selector: 'app-place-picker',
  imports: [RouterLink],
  templateUrl: './place-picker.html',
  styleUrl: './place-picker.css',
})
export class PlacePicker implements OnDestroy , OnInit{

  constructor(
    private readonly reciveDateInfo : sendDateInfo,
    private readonly httpClient :  HttpClient,
    private readonly router : Router
  ){
    for(let i = 0 ;i < this.amountOfPlaces;i++){
      let new_parkingSpace : parkingSpace = {id : i , status : true , clicked :false}
      this.parkingSpaces.push(new_parkingSpace)
    }
    this.parkingSpaces[0].isVIP = true; // Przykład: pierwsze miejsce jako VIP
  }
  Date : string  | null=''
  taken_places : number[] = []
   dateSubsription : Subscription | undefined;
  parkingSpaces : parkingSpace[] = []
  amountOfPlaces = 20;
  adminFlag = localStorage.getItem('role') === 'admin' ? true : false;

  private userJWT = localStorage.getItem('accessToken') || '' ; 

  ngOnInit(): void { 
    

    this.dateSubsription = this.reciveDateInfo.currentDateValue$.subscribe(newDate =>{
        // console.log(newDate)
        this.Date =  newDate
    })
    // console.log(this.Date)
    this.loadDate();
}
  loadDate(){
    const header = new HttpHeaders().set('Authorization' , `Bearer ${this.userJWT}`);
    this.httpClient.get<number[]>(`http://localhost:3000/reservation/avaible-places?date=${this.Date}`,{
    headers : header
    } ).subscribe({
      next : (response =>{
        console.log(response)
        
        this.parkingSpaces.forEach(space =>{
          
          if(response.includes(space.id)){
            
            space.status = false
          }
        })
    })
  })
  }
  selectPlace(placeId : number){
    
    this.parkingSpaces[placeId].clicked = !this.parkingSpaces[placeId].clicked
  }

  async takePlace(){
    console.log(localStorage.getItem('selectedDate'))
    const header = new HttpHeaders().set('Authorization' , `Bearer ${this.userJWT}`);
    let id_of_taken_places : number = -1;
    this.parkingSpaces.forEach(space =>{
      if(space.clicked){
        id_of_taken_places= space.id;
      }
    })
    if (id_of_taken_places === -1){
      return;
    }
    const new_reservation = {
      madeByID : localStorage.getItem('user'),
      date : this.Date,
      placeChoosen : id_of_taken_places   
    }
    try {
     this.httpClient.post('http://localhost:3000/reservation/new-reservation' , new_reservation , {
      headers : header
    }).subscribe({
        next : (response) =>{
          // console.log(response)
          this.loadDate();
          this.parkingSpaces[id_of_taken_places].clicked = false;
        },
        error : (error) =>{
          Swal.fire({
            title: "Error",
            text:  "User may already have reservation for this date",
            icon: "warning"
          })
        }
    })
  } catch (error){
    console.error("Error making reservation:", error);
  }
    // this.router.navigate(['/place-picker'])

  }
  adminRedirect(){
    this.router.navigate(['/admin'])
  }
  reserRedirect(){
    this.router.navigate(['/my-reservations'])
  }
  ngOnDestroy(): void {
    if(this.dateSubsription){
      this.dateSubsription.unsubscribe();
    }
  }
}

