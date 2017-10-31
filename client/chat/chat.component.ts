import { Component } from '@angular/core';
import {ChatService, UsersService} from '../app/services/app.service.js';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Component({
  moduleId: module.id,
  selector: 'task-chat',
  templateUrl: 'chat.component.html',
  providers: [UsersService, ChatService]
})
export class ChatComponent {
  success = null;
  errors = null;
  constructor(private userService:UsersService, private chatService:ChatService){
    this.user = userService.getUser()
    try{
      this.socket = io.connect('http://127.0.0.1:8080/')
    }catch(e){
      //set status to warn user
    }
  }

  submitChat(event){
    var self = this
    if(event.which == 13 && event.shiftKey == false){
      this.socket.emit('input', {
        name: 'bill',
        message: $('#chat_textarea').val()
      })
    }
  }
}
