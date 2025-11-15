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
    for(let i = 1 ;i <= this.amountOfPlaces;i++){
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
    this.httpClient.get<number[]>(`http://localhost:3000/reservation/avaible-places?date=10/11/2025` ).subscribe({
      next : (response =>{
        console.log(response)
        
        this.parkingSpaces.forEach(space =>{
          if(this.taken_places.includes(space.id)){
            space.status = false
          }
        })
    })
  })}
  
  selectPlace(placeId : number){
    this.parkingSpaces[placeId].clicked = !this.parkingSpaces[placeId].clicked
  }

  ngOnDestroy(): void {
    if(this.dateSubsription){
      this.dateSubsription.unsubscribe();
    }
  }
}

