import { Component } from '@angular/core';
import {UsersService} from '../app/services/app.service.js';

@Component({
  moduleId: module.id,
  selector: 'task-login',
  templateUrl: 'login.component.html',
  providers: [UsersService]
})
export class LoginComponent {
  constructor(private userService:UsersService){

      }
  login(event){
    var username = $("#username").val();
    var password = $("#password").val();
    var login = {
      username:username,
      password:password
    };
    //save task to database
    this.userService.login(login).subscribe(data => {
      console.log(data);
    });
  }
}
