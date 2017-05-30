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
//task service is needed because we are connecting to a database
var ProfileComponent = (function () {
    function ProfileComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.success = null;
        this.errors = null;
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
        var picture = {
            userid: this.user._id,
            url: '/images/profile2.png',
            caption: 'Hmm, our guess is that you do not look like this.'
        };
        //save task to database
        this.userService.addPicture(picture).subscribe(function (data) {
            data = JSON.parse(data);
            if (data.success == true) {
                //redirect to homepage
                _this.Picture = data.picture;
            }
            else {
                _this.success = data.success;
                _this.errors = data.errors;
            }
        });
    };
    ProfileComponent.prototype.changePassword = function (event) {
        var _this = this;
        event.preventDefault();
        var newPassword = this.newPassword;
        var verifyPassword = this.verifyPassword;
        var resetPassword = {
            username: this.user.name,
            password: newPassword,
            verifyPassword: verifyPassword
        };
        this.userService.resetPassword(resetPassword).subscribe(function (data) {
            data = JSON.parse(data);
            if (data.success == true) {
                console.log("success");
                _this.newPassword = '';
                _this.verifyPassword = '';
            }
            else {
                console.log("failure");
                _this.success = data.success;
                _this.errors = data.errors;
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
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.UsersService !== "undefined" && app_service_1.UsersService) === "function" && _a || Object])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
var _a;
//# sourceMappingURL=profile.component.js.map