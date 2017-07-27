import { Component, OnInit, ElementRef, Input  } from '@angular/core';
import {UsersService} from '../../app/services/app.service';
import {UsersComponent} from '../users/users.component'
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
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
  constructor(private userService:UsersService, private el: ElementRef){
    this.user = userService.getUser();
    //used to get updated picture if needed
    this.userService.getUserById(this.user._id)
      .subscribe(user => {
        this.Picture = user.picture;
      });
    this.userService.getUsers()
      .subscribe(allUsers => {
          this.allUsers = allUsers;

        });
      //if the user has no picture uploaded
      if(!this.user.picture || this.user.picture.url == ''){
        this.Picture.url = 'images/profile.png';
        this.Picture.caption = 'Hmm, our guess is that you do not look like this.';
      }
    }
    addPicture(event){
      var userId = $("#userId").val();
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#changeProfilePictureFileInput');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if(fileCount > 0){
          formData.append('changeProfilePictureFileInput', inputEl.files.item(0));
          formData.append('userId', userId)
        }

        //let headers = new Headers();
        //headers.append('Content-Type', 'multipart/form-data');
        //headers.append('Accept', 'application/json');
        //let options = new RequestOptions({ headers: headers });
        /*var pictureData = {
          formData: formData,
          userId: userId
        }*/
        this.userService.addPicture(formData).subscribe(data => {
          data = data;
          console.log('data: ' + data)
          console.log('success' + data.success );
          if(data.success == true){
            //redirect to homepage
            this.Picture = data.picture
            //reload page
            window.location.reload();
          }else{
            this.success = data.success
            this.errors.addPicture = data.errors
          }
        }

      /*var picture = {
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
      });*/
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
