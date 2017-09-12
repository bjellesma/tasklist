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
        if (env_js_1.getEnvVariables().MODE == 'development') {
            console.log('Task Service Initialized...');
        }
    }
    //this route is mapped out in routes/tasks.js
    TaskService.prototype.getTasks = function () {
        //return the tasks page as json
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.get('http://' + env_js_1.getEnvVariables().APIIP + '/api/tasks')
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.get('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tasks')
                .map(function (res) { return res.json(); });
        }
    };
    TaskService.prototype.addTask = function (newTask) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.post('http://' + env_js_1.getEnvVariables().APIIP + '/api/task', JSON.stringify(newTask), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.post('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/task', JSON.stringify(newTask), { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    TaskService.prototype.deleteTask = function (id) {
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.delete('http://' + env_js_1.getEnvVariables().APIIP + '/api/task/' + id)
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.delete('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/task/' + id)
                .map(function (res) { return res.json(); });
        }
    };
    TaskService.prototype.updateStatus = function (task) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.put('http://' + env_js_1.getEnvVariables().APIIP + '/api/task/' + task._id, JSON.stringify(task), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.put('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/task/' + task._id, JSON.stringify(task), { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    TaskService.prototype.editTaskTitle = function (task) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.put('http://' + env_js_1.getEnvVariables().APIIP + '/api/editTaskTitle', JSON.stringify(task), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.put('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/editTaskTitle', JSON.stringify(task), { headers: headers })
                .map(function (res) { return res.json(); });
        }
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
        if (env_js_1.getEnvVariables().MODE == 'development') {
            console.log('Tab Service Initialized...');
        }
    }
    TabService.prototype.getTab = function (id) {
        //return the tasks page as json
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.get('http://' + env_js_1.getEnvVariables().APIIP + '/api/tab/' + id)
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.get('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tab' + id)
                .map(function (res) { return res.json(); });
        }
    };
    //this route is mapped out in routes/tasks.js
    TabService.prototype.getTabs = function () {
        //return the tasks page as json
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.get('http://' + env_js_1.getEnvVariables().APIIP + '/api/tabs')
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.get('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tabs')
                .map(function (res) { return res.json(); });
        }
    };
    TabService.prototype.addTab = function (newTab) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.post('http://' + env_js_1.getEnvVariables().APIIP + '/api/new-list', JSON.stringify(newTab), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.post('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/new-list', JSON.stringify(newTab), { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    TabService.prototype.deleteTab = function (id) {
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.delete('http://' + env_js_1.getEnvVariables().APIIP + '/api/tab/' + id)
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.delete('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tab/' + id)
                .map(function (res) { return res.json(); });
        }
    };
    TabService.prototype.updateTab = function (tab, updateInfo) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.put('http://' + env_js_1.getEnvVariables().APIIP + '/api/tab/' + tab._id, JSON.stringify({ tab: tab, updateInfo: updateInfo }), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.put('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().APIPORT + '/api/tab/' + tab._id, JSON.stringify({ tab: tab, updateInfo: updateInfo }), { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    return TabService;
}());
TabService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TabService);
exports.TabService = TabService;
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.APIIP = env_js_1.getEnvVariables().APIIP;
        this.APIPORT = env_js_1.getEnvVariables().APIPORT;
        this.MODE = env_js_1.getEnvVariables().MODE;
        if (env_js_1.getEnvVariables().MODE == 'development') {
            console.log('Users Service Initialized...');
        }
    }
    UsersService.prototype.login = function (login) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.MODE == 'openshift') {
            return this.http.post('http://' + this.APIIP + '/login', JSON.stringify(login), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.post('http://' + this.APIIP + ':' + this.APIPORT + '/login', JSON.stringify(login), { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    UsersService.prototype.register = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.MODE == 'openshift') {
            return this.http.post('http://' + this.APIIP + '/register', JSON.stringify(newUser), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.post('http://' + this.APIIP + ':' + this.APIPORT + '/register', JSON.stringify(newUser), { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    UsersService.prototype.resetPassword = function (resetPassword) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.MODE == 'openshift') {
            return this.http.post('http://' + this.APIIP + '/resetPassword', JSON.stringify(resetPassword), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.post('http://' + this.APIIP + ':' + this.APIPORT + '/resetPassword', JSON.stringify(resetPassword), { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    UsersService.prototype.addPicture = function (formData) {
        if (this.MODE == 'openshift') {
            return this.http.post('http://' + this.APIIP + '/api/addPicture', formData)
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.post('http://' + this.APIIP + ':' + this.APIPORT + '/api/addPicture', formData)
                .map(function (res) { return res.json(); });
        }
    };
    //this route is mapped out in routes/tasks.js
    UsersService.prototype.getUsers = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        //return the tasks page as json
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.get('http://' + this.APIIP + '/api/users')
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.get('http://' + this.APIIP + ':' + this.APIPORT + '/api/users')
                .map(function (res) { return res.json(); });
        }
    };
    UsersService.prototype.getUser = function () {
        var user = env_js_1.getEnvVariables().user;
        return user;
    };
    UsersService.prototype.getUserById = function (userId) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        //return the tasks page as json
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.post('http://' + this.APIIP + '/api/user/' + userId)
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.post('http://' + this.APIIP + ':' + this.APIPORT + '/api/user/' + userId)
                .map(function (res) { return res.json(); });
        }
    };
    UsersService.prototype.addUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (env_js_1.getEnvVariables().MODE == 'openshift') {
            return this.http.post('http://' + this.APIIP + '/api/new-user', JSON.stringify(newUser), { headers: headers })
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.post('http://' + this.APIIP + ':' + this.APIPORT + '/api/new-user', JSON.stringify(newUser), { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    return UsersService;
}());
UsersService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=app.service.js.map