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
//task service is needed because we are connecting to a database
var NewListComponent = (function () {
    function NewListComponent(tabService) {
        var _this = this;
        this.tabService = tabService;
        this.tabService.getTabs()
            .subscribe(function (allTabs) {
            _this.allTabs = allTabs;
        });
    }
    NewListComponent.prototype.addList = function (event) {
        var _this = this;
        event.preventDefault();
        var newList = {
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
    return NewListComponent;
}());
NewListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'new-list',
        templateUrl: 'new-list.component.html',
        providers: [app_service_1.TabService]
    }),
    __metadata("design:paramtypes", [app_service_1.TabService])
], NewListComponent);
exports.NewListComponent = NewListComponent;
//# sourceMappingURL=new-list.component.js.map