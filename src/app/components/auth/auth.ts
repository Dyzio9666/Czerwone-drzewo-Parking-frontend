import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { authService } from '../../services/authservice';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: 'app-auth',
  standalone : true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  constructor(
    private readonly authService :authService,
    private readonly router : Router
  ){

  }
  username : string = ''
  password : string = ''
  login(){
    try {
      
      this.authService.loginUser(this.username,this.password)
      this.username = ''
      this.password = ''
      console.log('Elo')
      Swal.fire({
        title:"Logged Succesfully",
        text : "You have logged Succesfully",
        icon : "success"
      })
      this.router.navigate(['/date'])
    }
    catch(e)
    {
      
      throw new Error("Invalid Credentials")
      
    }
    
    
  }
}
