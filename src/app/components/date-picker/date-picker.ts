import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { sendDateInfo } from '../../services/sendDateInfoservice';
@Component({
  selector: 'date-picker',
  imports: [MatFormField, MatInputModule, MatDatepickerModule, RouterLink],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DatePicker {
  constructor(
    private readonly router : Router,
    private readonly currentDateService : sendDateInfo
  ){

  }
  @ViewChild('dateinput') date? : ElementRef 
  
  adminFlag = localStorage.getItem('role') === 'admin' ? true : false;
  toggle(){
    this.currentDateService.updateDateInfo(this.date?.nativeElement.value)
    // console.log(this.currentDateService.currentDateValue$)
    if(this.date?.nativeElement.value){
      localStorage.setItem('selectedDate' , this.date?.nativeElement.value)   
        this.router.navigate(['/place-picker'])
        return;
    }
    else {
      Swal.fire({
        title: "No Date Selected",
        text: "Please select a date before proceeding",
        icon: "warning"
      })
    }
    
      // console.log(this.date?.nativeElement.value)
    // this.router.navigate(['/place-picker'])
  }
  adminRedirect(){
    this.router.navigate(['/admin'])
  }
}
