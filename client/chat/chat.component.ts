import { Component } from '@angular/core';
import {UsersService} from '../app/services/app.service.js';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Component({
  moduleId: module.id,
  selector: 'task-chat',
  templateUrl: 'chat.component.html',
  providers: [UsersService]
})
export class ChatComponent {
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
