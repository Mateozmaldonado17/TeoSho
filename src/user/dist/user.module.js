"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var user_controller_1 = require("./user.controller");
var app_service_1 = require("../app.service");
var user_service_1 = require("./user.service");
var nestjs_prisma_1 = require("nestjs-prisma");
var jwt_1 = require("@nestjs/jwt");
var jwt_strategy_1 = require("../jwt.strategy");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        common_1.Module({
            imports: [
                jwt_1.JwtModule.register({
                    secret: 'i-am-think-that-i-am-the-right-person-for-this-position',
                    signOptions: { expiresIn: '1h' }
                }),
            ],
            controllers: [user_controller_1.UserController],
            providers: [app_service_1.AppService, user_service_1.UserService, nestjs_prisma_1.PrismaService, jwt_strategy_1.JwtStrategy],
            exports: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
