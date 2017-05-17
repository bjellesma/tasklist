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
var app_service_1 = require("../app/services/app.service");
var users_service_1 = require("../../../users/users.service");
//task service is needed because we are connecting to a database
var NewListComponent = (function () {
    function NewListComponent(tabService, userService) {
        var _this = this;
        this.tabService = tabService;
        this.userService = userService;
        this.user = [];
        this.allUsers = [];
        this.user = userService.getUser();
        this.allUsers = userService.getUsers();
        this.tabService.getTabs()
            .subscribe(function (allTabs) {
            _this.allTabs = allTabs;
        });
    }
    NewListComponent.prototype.addList = function (event) {
        var _this = this;
        event.preventDefault();
        var newList = {
            user_id: this.user._id,
            display: this.title,
            name: this.title + '-tasks',
        };
        //save list to database
        this.tabService.addTab(newList)
            .subscribe(function (list) {
            _this.allTabs.push(newList);
            _this.title = '';
        });
    };
    NewListComponent.prototype.deleteList = function (id) {
        var allTabs = this.allTabs;
        this.tabService.deleteTab(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < allTabs.length; i++) {
                    if (allTabs[i]._id == id) {
                        allTabs.splice(i, 1);
                    }
                }
            }
        });
    };
    NewListComponent.prototype.chooseShare = function (list) {
        var shareList = "<select size='20'>";
        var n = 0;
        var users = this.allUsers;
        for (n = 0; n <= users.length; n++) {
            shareList += "<option value='" + users[n]._id + "'>" + users[n].name + "</option>";
        }
        shareList += "</select>";
        $("#shareList").html(shareList + "<button value='share' onclick='shareList(list)'>");
    };
    NewListComponent.prototype.shareList = function (list) {
        //use alert to get user_id
        var user_id = "fred";
        this.tabService.updateTab(list, { share: [user_id] }).subscribe(function (data) {
            alert("This list has been shared with " + user_id);
        });
    };
    return NewListComponent;
}());
NewListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'new-list',
        templateUrl: 'new-list.component.html',
        providers: [app_service_1.TabService, users_service_1.UsersService]
    }),
    __metadata("design:paramtypes", [app_service_1.TabService, typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" && _a || Object])
], NewListComponent);
exports.NewListComponent = NewListComponent;
var _a;
//# sourceMappingURL=new-list.component.js.map