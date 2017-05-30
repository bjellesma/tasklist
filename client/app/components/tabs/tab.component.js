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
var task_component_1 = require("../tasks/task.component");
var app_service_1 = require("../../services/app.service");
var TabComponent = (function () {
    function TabComponent(tabService, userService) {
        var _this = this;
        this.tabService = tabService;
        this.userService = userService;
        this.tabs = [];
        this.user = [];
        this.user = userService.getUser();
        this.tabService.getTabs()
            .subscribe(function (tabs) {
            _this.tabs = tabs;
            //set the category Tasks of the Tasks category
            task_component_1.TasksComponent.categoryTasks = tabs;
        });
    }
    TabComponent.prototype.createTab = function (event) {
        $(".task-tab-content").css("display", "none");
        $("#task-entry").css("display", "none");
        $("#tabCreation").css("display", "block");
    };
    TabComponent.prototype.addTab = function (event) {
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
            _this.tabs.push(newList);
            _this.title = '';
        });
        window.location.reload();
    };
    TabComponent.prototype.deleteList = function (id) {
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
    TabComponent.prototype.chooseShare = function (list) {
        var shareList = "<select size='20'>";
        var n = 0;
        var curTab = list._id;
        var tabService = this.tabService;
        var users = this.allUsers;
        //TODO get tab from db based on id
        //TODO get shares from tab
        //TODO if any options are equal to what is here, we won't include when we grab the list of users
        for (n = 0; n < users.length; n++) {
            shareList += "<option value='" + users[n]._id + "'>" + users[n].name + "</option>";
        }
        shareList += "</select>";
        $("#shareList").html(shareList + "<button id='shareListButton'>Share</button>");
        $("#shareListButton").click(function () {
            var user_id = $("#shareList").find(":selected").val();
            var userName = $("#shareList").find(":selected").text();
            tabService.updateTab(list, { share: [user_id] }).subscribe(function (data) {
                alert("This list has been shared with " + userName);
            });
        });
    };
    TabComponent.prototype.openTab = function (evt, tabDisplay, tabName, cat_id, user_id) {
        //display task entry form again if it was disabled
        $("#task-entry").css("display", "block");
        $(".task-tab-content").css("display", "block");
        //hide tab creation if it was enabled
        $("#tabCreation").css("display", "none");
        // Declare all variables
        var i, tabcontent, tablinks;
        if ($("#all-tasks-table").css("display", "block")) {
            $("#all-tasks-table").css("display", "none");
        }
        $("#task-category-id").val(cat_id);
        $("#task-user-id").val(user_id);
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
    __metadata("design:paramtypes", [app_service_1.TabService, app_service_1.UsersService])
], TabComponent);
exports.TabComponent = TabComponent;
//# sourceMappingURL=tab.component.js.map