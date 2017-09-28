import { Component } from '@angular/core';
import {UsersService, TabService} from '../app/services/app.service.js';
//task service is needed because we are connecting to a database

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: 'users.component.html',
  providers: [UsersService, TabService]
})
export class UsersComponent {
  allUsers:Users[];
  static user:Users[];
  constructor(private UsersService:UsersService, private tabService:TabService){
    this.user = UsersService.getUser();
    this.UsersService.getUserById(this.user._id)
      .subscribe(user => {
        this.user.picture = user.picture;
        if(!this.user.picture || this.user.picture.url == ''){
          this.user.picture.url = 'images/profile.png';
        }
      });

  }
}
