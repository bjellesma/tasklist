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
var app_service_1 = require("../../services/app.service");
var TabComponent = (function () {
    function TabComponent(tabService) {
        var _this = this;
        this.tabService = tabService;
        this.tabs = [];
        this.tabService.getTabs()
            .subscribe(function (tabs) {
            _this.tabs = tabs;
            //console.log("Tabs: " + tabs);
        });
    }
    TabComponent.prototype.openTab = function (evt, tabDisplay, tabName) {
        // Declare all variables
        var i, tabcontent, tablinks;
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("task-tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    };
    return TabComponent;
}());
TabComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'task-tabs',
        templateUrl: 'tab.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.TabService])
], TabComponent);
exports.TabComponent = TabComponent;
//# sourceMappingURL=tab.component.js.map