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
var app_service_js_1 = require("../app/services/app.service.js");
var forgotPasswordComponent = (function () {
    function forgotPasswordComponent(userService) {
        this.userService = userService;
        this.success = null;
        this.errors = null;
    }
    forgotPasswordComponent.prototype.resetPassword = function (event) {
        var _this = this;
        var username = $("#username").val();
        var password = $("#password").val();
        var verifyPassword = $("#verifyPassword").val();
        var resetPassword = {
            username: username,
            password: password,
            verifyPassword: verifyPassword
        };
        //save task to database
        this.userService.resetPassword(resetPassword).subscribe(function (data) {
            data = JSON.parse(data);
            if (data.success == true) {
                //redirect to homepage
                window.location.replace('/');
            }
            else {
                _this.success = data.success;
                _this.errors = data.errors;
            }
        });
    };
    return forgotPasswordComponent;
}());
forgotPasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'task-forgotPassword',
        templateUrl: 'forgotPassword.component.html',
        providers: [app_service_js_1.UsersService]
    }),
    __metadata("design:paramtypes", [app_service_js_1.UsersService])
], forgotPasswordComponent);
exports.forgotPasswordComponent = forgotPasswordComponent;
//# sourceMappingURL=forgotPassword.component.js.map