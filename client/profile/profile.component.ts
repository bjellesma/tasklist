import { Component } from '@angular/core';
import {UsersService} from '../../app/services/app.service';
//task service is needed because we are connecting to a database

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: 'profile.component.html',
  providers: [UsersService]
})
export class ProfileComponent {
  static user:Users[];
  Picture = {
    url:'',
    caption:''
  };
  constructor(private UsersService:UsersService){
    this.user = UsersService.getUser();
    this.UsersService.getUsers()
      .subscribe(allUsers => {
          this.allUsers = allUsers;

        });
      if(!this.user.profilePicture || this.user.profilePicture == ''){
        this.Picture.url = '/images/profile.png';
        this.Picture.caption = 'Hmm, our guess is that you do not look like this.';
      }
    }
    addPicture(event){
      var picture = {
        userid:this.user._id,
        url:'/images/profile.png',
        caption:'Hmm, our guess is that you do not look like this.'
      };
      //save task to database
      this.userService.addPicture(picture).subscribe(data => {
        data = JSON.parse(data);
        if(data.success == true){
          //redirect to homepage
          Picture = data.picture
        }else{
          this.success = data.success
          this.errors = data.errors
        }
      });
    }
}
