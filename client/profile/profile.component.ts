import { Component } from '@angular/core';
import {UsersService} from '../users/users.service';
//task service is needed because we are connecting to a database

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: 'profile.component.html',
  providers[UsersService]
})
export class ProfileComponent {
  static user:Users[];
  constructor(private UsersService:UsersService){
    this.user = UsersService.getUser();
    this.UsersService.getUsers()
      .subscribe(allUsers => {
          this.allUsers = allUsers;

        });
      }
}
