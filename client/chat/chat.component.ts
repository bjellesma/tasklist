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
    var socket = io.connect('http://127.0.0.1:8080/')
    socket.emit('input': {'name': this.user.name, 'message': 'hello'})
  }

}
