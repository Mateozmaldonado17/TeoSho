"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProductService = void 0;
var common_1 = require("@nestjs/common");
var ProductService = /** @class */ (function () {
    function ProductService(prisma) {
        this.prisma = prisma;
    }
    ProductService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.product.findMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.getById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.product.findFirst({
                            where: {
                                id: id
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.getByName = function (name) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.product.findFirst({
                            where: {
                                name: name
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.validateIfExistProductByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var getProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByName(name)];
                    case 1:
                        getProduct = _a.sent();
                        if (getProduct) {
                            throw new common_1.HttpException(name + " is already exist", 401);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.validateIfNotExistProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var getProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        getProduct = _a.sent();
                        if (!getProduct) {
                            throw new common_1.HttpException('This product is not exist', 404);
                        }
                        return [2 /*return*/, getProduct];
                }
            });
        });
    };
    ProductService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var getProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateIfNotExistProductById(id)];
                    case 1:
                        getProduct = _a.sent();
                        return [4 /*yield*/, getProduct];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.create = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var name, image, description, price, newProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = params.name, image = params.image, description = params.description, price = params.price;
                        return [4 /*yield*/, this.validateIfExistProductByName(name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.product.create({
                                data: {
                                    description: description,
                                    name: name,
                                    price: price,
                                    image: image
                                }
                            })];
                    case 2:
                        newProduct = _a.sent();
                        return [4 /*yield*/, newProduct];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.update = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var name, image, description, price, id, newProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = params.name, image = params.image, description = params.description, price = params.price, id = params.id;
                        return [4 /*yield*/, this.validateIfExistProductByName(name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.product.update({
                                data: {
                                    description: description,
                                    name: name,
                                    price: price,
                                    image: image
                                },
                                where: { id: parseInt(id) }
                            })];
                    case 2:
                        newProduct = _a.sent();
                        return [4 /*yield*/, newProduct];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype["delete"] = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var id, deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = params.id;
                        return [4 /*yield*/, this.validateIfNotExistProductById(+id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.product["delete"]({
                                where: { id: parseInt(id) }
                            })];
                    case 2:
                        deletedProduct = _a.sent();
                        return [4 /*yield*/, deletedProduct];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        common_1.Get()
    ], ProductService.prototype, "getAll");
    ProductService = __decorate([
        common_1.Injectable()
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
