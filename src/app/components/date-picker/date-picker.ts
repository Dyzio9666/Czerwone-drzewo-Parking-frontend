import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'date-picker',
  imports: [MatFormField,MatInputModule,MatDatepickerModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DatePicker {
  @ViewChild('dateinput') date? : ElementRef 
  

  toggle(){
      console.log(this.date?.nativeElement.value)
  }
}
