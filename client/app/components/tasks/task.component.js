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
var TasksComponent = TasksComponent_1 = (function () {
    //this refers to the task service dependancy
    //the params in these functions must be declare as providers in app.module.ts
    function TasksComponent(taskService, userService, tabService) {
        var _this = this;
        this.taskService = taskService;
        this.userService = userService;
        this.tabService = tabService;
        this.tabs = [];
        var n = 0;
        this.user = userService.getUser();
        this.tabs = tabService.getTabs();
        this.taskService.getTasks()
            .subscribe(function (allTasks) {
            _this.allTasks = allTasks;
            for (n = 0; n < allTasks.length; n++) {
                allTasks[n].pictureurl = _this.userService.getPictureURLbyID(allTasks[n].userid);
            }
            //TasksComponent.categoryTasks is the variable with the information held by tab.component
            _this.categoryTasks = TasksComponent_1.categoryTasks;
        });
    }
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        //console.log(document.getElementsByClassName("active"));
        event.preventDefault();
        this.category = $("#task-category-id").val();
        this.userId = $("#task-user-id").val();
        var newTask = {
            title: this.title,
            isDone: false,
            cat_id: this.category,
            user_id: this.userId,
            priority: this.priority,
            due_date: this.dueDate
        };
        //save task to database
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.allTasks.push(task);
            _this.title = '';
            _this.dueDate = '';
            _this.priority = '';
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
    TasksComponent.prototype.sortTable = function (n, id) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById(id);
        console.log("table: " + table);
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.getElementsByTagName("TR");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount++;
            }
            else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    };
    return TasksComponent;
}());
TasksComponent = TasksComponent_1 = __decorate([
    core_1.Component({
        //in order to use the relative path, we need to include the following line
        moduleId: module.id,
        selector: 'all-tasks',
        templateUrl: 'task.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.TaskService, app_service_1.UsersService, app_service_1.TabService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
var TasksComponent_1;
//# sourceMappingURL=task.component.js.map