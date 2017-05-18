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
var UsersComponent = (function () {
    function UsersComponent(UsersService) {
        var _this = this;
        this.UsersService = UsersService;
        this.user = UsersService.getUser();
        this.UsersService.getUsers()
            .subscribe(function (allUsers) {
            _this.allUsers = allUsers;
            console.log('all users' + allUsers);
        });
    }
    return UsersComponent;
}());
UsersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'users',
        templateUrl: 'users.component.html',
        providers: [app_service_1.UsersService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.UsersService !== "undefined" && app_service_1.UsersService) === "function" && _a || Object])
], UsersComponent);
exports.UsersComponent = UsersComponent;
var _a;
//# sourceMappingURL=users.component.js.map