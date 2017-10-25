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
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var ChatComponent = (function () {
    function ChatComponent(userService, chatService) {
        this.userService = userService;
        this.chatService = chatService;
        this.success = null;
        this.errors = null;
        this.user = userService.getUser();
        var socket = io.connect('http://127.0.0.1:8080/');
        socket.emit('input', { 'name': this.user.name, 'message': 'hello' });
    }
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'task-chat',
        templateUrl: 'chat.component.html',
        providers: [app_service_js_1.UsersService, app_service_js_1.ChatService]
    }),
    __metadata("design:paramtypes", [app_service_js_1.UsersService, app_service_js_1.ChatService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map