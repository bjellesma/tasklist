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
var TasksComponent = (function () {
    //this refers to the task service dependancy
    //the params in these functions must be declare as providers in app.module.ts
    function TasksComponent(taskService, tabService) {
        var _this = this;
        this.taskService = taskService;
        this.tabService = tabService;
        this.taskService.getTasks()
            .subscribe(function (allTasks) {
            var tabs = tabService.getTabs();
            console.log("Now gett tabs: " + tabs.toString());
            _this.allTasks = allTasks;
        });
        //this.itTasks refers to the itTasks of this class
    }
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        };
        //save task to database
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.allTasks.push(task);
            _this.title = '';
        });
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var allTasks = this.allTasks;
        this.taskService.deleteTask(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < allTasks.length; i++) {
                    if (allTasks[i]._id == id) {
                        allTasks.splice(i, 1);
                    }
                }
            }
        });
    };
    TasksComponent.prototype.updateStatus = function (task) {
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.updateStatus(_task).subscribe(function (data) {
            task.isDone = !task.isDone;
        });
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        //in order to use the relative path, we need to include the following line
        moduleId: module.id,
        selector: 'all-tasks',
        templateUrl: 'task.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.TaskService, app_service_1.TabService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=task.component.js.map