import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { authService } from '../../services/authservice';
import { Router, RouterLink } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(
    private readonly authService : authService,
    private readonly router : Router
  ){

  }
  username: string = ''
  password : string = ''
  password1 : string =''

  register (){
      if(this.password === this.password1){
        try {
          this.authService.register(this.username, this.password)
          Swal.fire({
          title: "Registered Succesfully",
          text: "You have registered succesfully, you can now login",
          icon: "success"
          })
          this.router.navigate(['/'])
        } catch (e){
          console.log(e)
        }
        
      }
        
      
  }
}
