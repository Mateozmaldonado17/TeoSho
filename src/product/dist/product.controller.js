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
exports.ProductController = exports.CreateProductoDto = exports.ProductDto = void 0;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var jwt_auth_guard_1 = require("../jwt-auth.guard");
var ProductDto = /** @class */ (function () {
    function ProductDto() {
    }
    __decorate([
        class_validator_1.IsNumberString()
    ], ProductDto.prototype, "id");
    return ProductDto;
}());
exports.ProductDto = ProductDto;
var CreateProductoDto = /** @class */ (function () {
    function CreateProductoDto() {
    }
    __decorate([
        class_validator_1.IsNumberString()
    ], CreateProductoDto.prototype, "id");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateProductoDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateProductoDto.prototype, "description");
    __decorate([
        class_validator_1.IsDecimal()
    ], CreateProductoDto.prototype, "price");
    __decorate([
        class_validator_1.IsUrl()
    ], CreateProductoDto.prototype, "image");
    return CreateProductoDto;
}());
exports.CreateProductoDto = CreateProductoDto;
var ProductController = /** @class */ (function () {
    function ProductController(_productService) {
        this._productService = _productService;
    }
    ProductController.prototype.getAll = function () {
        return this._productService.getAll();
    };
    ProductController.prototype.getById = function (params) {
        var id = params.id;
        return this._productService.findById(parseInt(id));
    };
    ProductController.prototype.create = function (params) {
        return this._productService.create(params);
    };
    ProductController.prototype.update = function (params) {
        return this._productService.update(params);
    };
    ProductController.prototype["delete"] = function (params) {
        return this._productService["delete"](params);
    };
    __decorate([
        common_1.Get()
    ], ProductController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param())
    ], ProductController.prototype, "getById");
    __decorate([
        common_1.Post(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body())
    ], ProductController.prototype, "create");
    __decorate([
        common_1.Patch(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body())
    ], ProductController.prototype, "update");
    __decorate([
        common_1.Delete(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body())
    ], ProductController.prototype, "delete");
    ProductController = __decorate([
        common_1.Controller('product')
    ], ProductController);
    return ProductController;
}());
exports.ProductController = ProductController;
