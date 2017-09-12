import { Component } from '@angular/core';
import {UsersService} from '../app/services/app.service.js';

@Component({
  moduleId: module.id,
  selector: 'task-login',
  templateUrl: 'login.component.html',
  providers: [UsersService]
})
export class LoginComponent {
  success = null;
  errors = null;
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
      data = JSON.parse(data);
      //if login is successful
      if(data.success == true){
        //redirect to homepage
        window.location.replace('/');
      }else{
        this.success = data.success
        this.errors = data.errors
        $("#password").val('');
      }
    });
  }
}
