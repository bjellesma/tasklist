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
  constructor(private chatService:ChatService){

  }

}
