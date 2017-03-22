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
var http_1 = require("@angular/http"); //to manipulate headers
require("rxjs/add/operator/map"); //get our requests and then map them
var env_js_1 = require("/env.js");
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        console.log('Task Service Initialized...');
    }
    //this route is mapped out in routes/tasks.js
    TaskService.prototype.getTasks = function () {
        //return the tasks page as json
        return this.http.get('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tasks')
            .map(function (res) { return res.json(); });
    };
    TaskService.prototype.addTask = function (newTask) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/task', JSON.stringify(newTask), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TaskService.prototype.deleteTask = function (id) {
        return this.http.delete('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/task/' + id)
            .map(function (res) { return res.json(); });
    };
    TaskService.prototype.updateStatus = function (task) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/task/' + task._id, JSON.stringify(task), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
var TabService = (function () {
    function TabService(http) {
        this.http = http;
        console.log('Tab Service Initialized...');
    }
    //this route is mapped out in routes/tasks.js
    TabService.prototype.getTabs = function () {
        //return the tasks page as json
        return this.http.get('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tabs')
            .map(function (res) { return res.json(); });
    };
    TabService.prototype.addTab = function (newTab) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tab', JSON.stringify(newTab), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TabService.prototype.deleteTab = function (id) {
        return this.http.delete('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tab/' + id)
            .map(function (res) { return res.json(); });
    };
    TabService.prototype.updateTab = function (tab) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tab/' + tab._id, JSON.stringify(tab), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return TabService;
}());
TabService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TabService);
exports.TabService = TabService;
//# sourceMappingURL=app.service.js.map