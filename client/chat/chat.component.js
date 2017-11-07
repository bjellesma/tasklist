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
var env_js_1 = require("/env.js");
var ChatComponent = (function () {
    function ChatComponent(userService, chatService) {
        var _this = this;
        this.userService = userService;
        this.chatService = chatService;
        this.chats = [];
        this.success = null;
        this.errors = null;
        this.user = userService.getUser();
        try {
            this.socket = io.connect('http://' + env_js_1.getEnvVariables().APIIP + ':' + env_js_1.getEnvVariables().CHATPORT + '/');
        }
        catch (e) {
            //set status to warn user
        }
        this.chatService.getChats()
            .subscribe(function (chats) {
            _this.chats = chats;
        });
    }
    ChatComponent.prototype.submitChat = function (event) {
        var self = this;
        var message = $('#chat_textarea').val();
        if (event.which == 13 && event.shiftKey == false) {
            this.socket.emit('input', {
                name: this.user.name,
                message: message
            });
            $('#chat_message').append(this.user.name + ": " + message);
        }
    };
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