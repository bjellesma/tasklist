"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_service_1 = require("../../app/services/app.service");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
//TODO change url var to use env
var URL = 'http://192.167.1.15:3000/api/upload';
var ProfileComponent = (function () {
    function ProfileComponent(userService, el) {
        var _this = this;
        this.userService = userService;
        this.el = el;
        this.success = null;
        this.errors = {
            changePassword: [],
            addPicture: []
        };
        this.successMessage = {
            changePassword: ''
        };
        this.Picture = {
            url: '',
            caption: ''
        };
        this.user = userService.getUser();
        this.userService.getUsers()
            .subscribe(function (allUsers) {
            _this.allUsers = allUsers;
        });
        if (!this.user.picture || this.user.picture == '') {
            this.Picture.url = '/images/profile.png';
            this.Picture.caption = 'Hmm, our guess is that you do not look like this.';
        }
        else {
            this.Picture.url = this.user.picture.url;
            this.Picture.caption = this.user.picture.caption;
        }
    }
    ProfileComponent.prototype.addPicture = function (event) {
        var _this = this;
        var userId = $("#userId").val();
        var inputEl = this.el.nativeElement.querySelector('#changeProfilePictureFileInput');
        //get the total amount of files attached to the file input.
        var fileCount = inputEl.files.length;
        var formData = new FormData();
        if (fileCount > 0) {
            formData.append('changeProfilePictureFileInput', inputEl.files.item(0));
            formData.append('userId', userId);
        }
        //let headers = new Headers();
        //headers.append('Content-Type', 'multipart/form-data');
        //headers.append('Accept', 'application/json');
        //let options = new RequestOptions({ headers: headers });
        /*var pictureData = {
          formData: formData,
          userId: userId
        }*/
        this.userService.addPicture(formData).subscribe(function (data) {
            data = JSON.parse(data);
            if (data.success == true) {
                //redirect to homepage
                _this.Picture = data.picture;
            }
            else {
                _this.success = data.success;
                _this.errors.addPicture = data.errors;
            }
        }, console.log(this.Picture));
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
    };
    ProfileComponent.prototype.changePassword = function (event) {
        var _this = this;
        event.preventDefault();
        var newPassword = $("#change-password-text-entry").val();
        var verifyPassword = $("#verify-password-text-entry").val();
        var resetPassword = {
            username: this.user.name,
            password: newPassword,
            verifyPassword: verifyPassword
        };
        this.userService.resetPassword(resetPassword).subscribe(function (data) {
            data = JSON.parse(data);
            if (data.success == true) {
                $("#change-password-text-entry").val('');
                $("#verify-password-text-entry").val('');
                _this.success = data.success;
                _this.successMessage.changePassword = "You have successfully changed your password!";
            }
            else {
                _this.success = data.success;
                _this.errors.changePassword = data.errors;
                $("#change-password-text-entry").val('');
                $("#verify-password-text-entry").val('');
            }
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user-profile',
        templateUrl: 'profile.component.html',
        providers: [app_service_1.UsersService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.UsersService !== "undefined" && app_service_1.UsersService) === "function" && _a || Object, core_1.ElementRef])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
var _a;
//# sourceMappingURL=profile.component.js.map