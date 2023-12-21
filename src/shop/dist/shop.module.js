"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShopModule = void 0;
var common_1 = require("@nestjs/common");
var shop_service_1 = require("./shop.service");
var shop_controller_1 = require("./shop.controller");
var nestjs_prisma_1 = require("nestjs-prisma");
var product_module_1 = require("src/product/product.module");
var ShopModule = /** @class */ (function () {
    function ShopModule() {
    }
    ShopModule = __decorate([
        common_1.Module({
            imports: [product_module_1.ProductModule],
            providers: [shop_service_1.ShopService, nestjs_prisma_1.PrismaService],
            controllers: [shop_controller_1.ShopController]
        })
    ], ShopModule);
    return ShopModule;
}());
exports.ShopModule = ShopModule;
