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
//task service is needed because we are connecting to a database
var UsersComponent = /** @class */ (function () {
    function UsersComponent(UsersService, tabService) {
        var _this = this;
        this.UsersService = UsersService;
        this.tabService = tabService;
        this.user = UsersService.getUser();
        this.UsersService.getUserById(this.user._id)
            .subscribe(function (user) {
            _this.user.picture = user.picture;
            if (!_this.user.picture || _this.user.picture.url == '') {
                _this.user.picture.url = 'images/profile.png';
            }
        });
    }
    UsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'users',
            templateUrl: 'users.component.html',
            providers: [app_service_js_1.UsersService, app_service_js_1.TabService]
        }),
        __metadata("design:paramtypes", [app_service_js_1.UsersService, app_service_js_1.TabService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map