import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { authService } from '../../services/authservice';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(
    private readonly authService : authService
  ){

  }
  username: string = ''
  password : string = ''
  password1 : string =''

  register (){
      if(this.password === this.password1){
        this.authService.register(this.username, this.password)
      }
  }
}
