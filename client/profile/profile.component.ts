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
  success = null;
  errors = {
    changePassword:[],
    addPicture[]
  };
  successMessage = {
    changePassword:''
  };
  Picture = {
    url:'',
    caption:''
  };
  constructor(private userService:UsersService){
    this.user = userService.getUser();
    this.userService.getUsers()
      .subscribe(allUsers => {
          this.allUsers = allUsers;

        });
      if(!this.user.picture || this.user.picture == ''){
        this.Picture.url = '/images/profile.png';
        this.Picture.caption = 'Hmm, our guess is that you do not look like this.';
      }else{
        this.Picture.url = this.user.picture.url;
        this.Picture.caption = this.user.picture.caption;
      }
    }
    addPicture(event){
      var picture = {
        userid:this.user._id,
        //TODO this will be the url of the new profile picture
        url:'/images/profile2.png',
        caption:'Hmm, our guess is that you do not look like this.'
      };
      //save task to database
      this.userService.addPicture(picture).subscribe(data => {
        data = JSON.parse(data);
        if(data.success == true){
          //redirect to homepage
          this.Picture = data.picture
        }else{
          this.success = data.success
          this.errors.addPicture = data.errors
        }
      });
    }
    changePassword(event){
      event.preventDefault();
      var newPassword = $("#change-password-text-entry").val();
      var verifyPassword = $("#verify-password-text-entry").val();
      var resetPassword = {
        username: this.user.name,
        password: newPassword,
        verifyPassword: verifyPassword
      };
      this.userService.resetPassword(resetPassword).subscribe(data => {
        data = JSON.parse(data);
        if(data.success == true){
          $("#change-password-text-entry").val('')
          $("#verify-password-text-entry").val('');
          this.success = data.success;
          this.successMessage.changePassword = "You have successfully changed your password!";
        }else{
          this.success = data.success;
          this.errors.changePassword = data.errors;
          $("#change-password-text-entry").val('')
          $("#verify-password-text-entry").val('');
        }
      });
    }
}
