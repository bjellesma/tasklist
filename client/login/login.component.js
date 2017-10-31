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
var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService) {
        this.userService = userService;
        this.success = null;
        this.errors = null;
    }
    LoginComponent.prototype.login = function (event) {
        var _this = this;
        var username = $("#username").val();
        var password = $("#password").val();
        var login = {
            username: username,
            password: password
        };
        //save task to database
        this.userService.login(login).subscribe(function (data) {
            data = JSON.parse(data);
            //if login is successful
            if (data.success == true) {
                //redirect to homepage
                window.location.replace('/');
            }
            else {
                _this.success = data.success;
                _this.errors = data.errors;
                $("#password").val('');
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'task-login',
            templateUrl: 'login.component.html',
            providers: [app_service_js_1.UsersService]
        }),
        __metadata("design:paramtypes", [app_service_js_1.UsersService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map