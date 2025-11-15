import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { sendDateInfo } from '../../services/sendDateInfoservice';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface parkingSpace {
  id : number,
  status : boolean,
  clicked?: boolean
}

function changeDateFormat(dateString: string): string {
  const [month, day,year] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
@Component({
  selector: 'app-place-picker',
  imports: [],
  templateUrl: './place-picker.html',
  styleUrl: './place-picker.css',
})
export class PlacePicker implements OnDestroy , OnInit{

  constructor(
    private readonly reciveDateInfo : sendDateInfo,
    private readonly httpClient :  HttpClient
  ){
    for(let i = 0 ;i < this.amountOfPlaces;i++){
      let new_parkingSpace : parkingSpace = {id : i , status : true , clicked :false}
      this.parkingSpaces.push(new_parkingSpace)
    }
  }
  Date : string  | null=''
  taken_places : number[] = []
   dateSubsription : Subscription | undefined;
  parkingSpaces : parkingSpace[] = []
  amountOfPlaces = 20;
  private userJWT = localStorage.getItem('accessToken') || '' ; 

  ngOnInit(): void { 
     console.log(this.userJWT)
     const header = new HttpHeaders().set('Authorization' , `Bearer ${this.userJWT}`);

    this.dateSubsription = this.reciveDateInfo.currentDateValue$.subscribe(newDate =>{
        // console.log(newDate)
        this.Date =  newDate
    })
    console.log(this.Date)
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
  })}
  
  selectPlace(placeId : number){
    this.parkingSpaces[placeId].clicked = !this.parkingSpaces[placeId].clicked
  }

  takePlace(){

    const header = new HttpHeaders().set('Authorization' , `Bearer ${this.userJWT}`);
    let id_of_taken_places : number = 0;
    this.parkingSpaces.forEach(space =>{
      if(space.clicked){
        id_of_taken_places= space.id;
      }
    })
    if (id_of_taken_places === 0){
      return;
    }
    const new_reservation = {
      madeByID : localStorage.getItem('user'),
      date : this.Date,
      placeChoosen : id_of_taken_places 
    }
    this.httpClient.post('http://localhost:3000/reservation/new-reservation' , new_reservation , {
      headers : header
    }).subscribe({})
  }

  ngOnDestroy(): void {
    if(this.dateSubsription){
      this.dateSubsription.unsubscribe();
    }
  }
}

