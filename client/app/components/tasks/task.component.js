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
var tab_component_1 = require("../tabs/tab.component");
var app_service_1 = require("../../services/app.service");
var TasksComponent = (function () {
    //this refers to the task service dependancy
    //the params in these functions must be declare as providers in app.module.ts
    function TasksComponent(tabComponent, taskService) {
        var _this = this;
        this.tabComponent = tabComponent;
        this.taskService = taskService;
        this.taskService.getTasks()
            .subscribe(function (allTasks) {
            _this.categoryTasks = tabComponent.tabs;
            //console.log("");
            _this.allTasks = allTasks;
            /*for(var i = 0; i < this.allTasks.length; i++){
              for(var j = 0; j < categories.length; j++){
                if(this.allTasks[i].category == categories[j][0]){
                  console.log(this.allTasks[i].title + " is part of " + categories[j][0]);
                  categories[j][]
                }
              }
            }*/
        });
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
    __metadata("design:paramtypes", [tab_component_1.TabComponent, app_service_1.TaskService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=task.component.js.map