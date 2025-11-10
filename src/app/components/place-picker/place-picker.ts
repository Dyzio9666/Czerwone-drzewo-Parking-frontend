import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { sendDateInfo } from '../../services/sendDateInfoservice';
import { Subscription } from 'rxjs';
interface parkingSpace {
  id : number,
  status : boolean,

}
@Component({
  selector: 'app-place-picker',
  imports: [],
  templateUrl: './place-picker.html',
  styleUrl: './place-picker.css',
})
export class PlacePicker implements OnDestroy{
  constructor(
    private readonly reciveDateInfo : sendDateInfo
  ){
    for(let i = 0 ;i < this.amountOfPlaces;i++){
      let new_parkingSpace : parkingSpace = {id : i , status : true}
      this.parkingSpaces.push(new_parkingSpace)
    }
  }
  Date : string = ''
   dateSubsription : Subscription | undefined;
  parkingSpaces : parkingSpace[] = []
  amountOfPlaces = 20;
  
    test(){
    this.dateSubsription = this.reciveDateInfo.currentDateValue$.subscribe(newDate =>{
        console.log(newDate)
    })
  }
  
  

  ngOnDestroy(): void {
    if(this.dateSubsription){
      this.dateSubsription.unsubscribe();
    }
  }
}

