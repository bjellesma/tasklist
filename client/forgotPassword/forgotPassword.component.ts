import { Component } from '@angular/core';
import {UsersService} from '../app/services/app.service.js';

@Component({
  moduleId: module.id,
  selector: 'task-forgotPassword',
  templateUrl: 'forgotPassword.component.html',
  providers: [UsersService]
})
export class forgotPasswordComponent {
  success = null;
  errors = null;
  constructor(private userService:UsersService){

      }
  resetPassword(event){
    var username = $("#username").val();
    var password = $("#password").val();
    var verifyPassword = $("#verifyPassword").val();
    var resetPassword = {
      username:username,
      password:password,
      verifyPassword:verifyPassword
    };
    //save task to database
    this.userService.resetPassword(resetPassword).subscribe(data => {
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
