import { Component } from '@angular/core';
import {UsersService} from '../app/services/app.service.js';

@Component({
  moduleId: module.id,
  selector: 'task-register',
  templateUrl: 'register.component.html',
  providers: [UsersService]
})
export class RegisterComponent {
  success = null;
  errors = null;
  constructor(private userService:UsersService){

      }
  register(event){
    var username = $("#username").val();
    var password = $("#password").val();
    var verifyPassword = $("#verifyPassword").val();
    var newUser = {
      username:username,
      password:password,
      verifyPassword:verifyPassword
    };
    //save task to database
    this.userService.register(newUser).subscribe(data => {
      data = JSON.parse(data);
      if(data.success == true){
        //redirect to homepage
        window.location.replace('/');
      }else{
        this.success = data.success
        this.errors = data.errors
        $("#password").val('');
        $("#verifyPassword").val('');
      }
    });
  }
}
