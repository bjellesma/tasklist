import { Component } from '@angular/core';
import {UsersService} from '../services/users.service';
//task service is needed because we are connecting to a database

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: 'users.component.html',
  providers[UsersService]
})
export class UsersComponent {
  allUsers:Users[];
  constructor(private UsersService:UsersService){
    this.UsersService.getUsers()
      .subscribe(allUsers => {
          this.allUsers = allUsers;
        });
      }
}
