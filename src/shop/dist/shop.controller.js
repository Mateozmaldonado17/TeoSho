"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ShopController = exports.ShopDto = exports.ShopItemDto = void 0;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var jwt_auth_guard_1 = require("../jwt-auth.guard");
var ShopItemDto = /** @class */ (function () {
    function ShopItemDto() {
    }
    __decorate([
        class_validator_1.IsDecimal()
    ], ShopItemDto.prototype, "price");
    __decorate([
        class_validator_1.IsNumber()
    ], ShopItemDto.prototype, "productId");
    return ShopItemDto;
}());
exports.ShopItemDto = ShopItemDto;
var ShopDto = /** @class */ (function () {
    function ShopDto() {
    }
    __decorate([
        class_validator_1.ValidateNested({
            message: 'format is invalid, try again'
        }),
        class_transformer_1.Type(function () { return ShopItemDto; })
    ], ShopDto.prototype, "items");
    return ShopDto;
}());
exports.ShopDto = ShopDto;
var ShopController = /** @class */ (function () {
    function ShopController(_shopService) {
        this._shopService = _shopService;
    }
    ShopController.prototype.create = function (params, req) {
        var items = params.items;
        return this._shopService.create(items, req.user);
    };
    ShopController.prototype.getAll = function (req) {
        return this._shopService.getShops(req.user);
    };
    __decorate([
        common_1.Post(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], ShopController.prototype, "create");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Request())
    ], ShopController.prototype, "getAll");
    ShopController = __decorate([
        common_1.Controller('shop')
    ], ShopController);
    return ShopController;
}());
exports.ShopController = ShopController;
