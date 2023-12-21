"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var testing_1 = require("@nestjs/testing");
var product_service_1 = require("./product.service");
var nestjs_prisma_1 = require("nestjs-prisma");
var product = {
    name: 'Car',
    image: 'image.jpg',
    description: 'Descripcion del producto',
    price: '100.21'
};
var prismaServiceMock = {
    product: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        "delete": jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
};
describe('ProductService', function () {
    var service;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            product_service_1.ProductService,
                            {
                                provide: nestjs_prisma_1.PrismaService,
                                useValue: prismaServiceMock
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    service = module.get(product_service_1.ProductService);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be defined', function () {
        expect(service).toBeDefined();
    });
    it('should get many products', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getAll()];
                case 1:
                    _a.sent();
                    expect(prismaServiceMock.product.findMany).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('validateIfNotExistProductById', function () {
        it('should throw an error if not exist product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        prismaServiceMock.product.findMany.mockRejectedValueOnce(false);
                        return [4 /*yield*/, service.validateIfNotExistProductById(1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        expect(error_1.response).toEqual('This product is not exist');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should run without errors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaServiceMock.product.findFirst.mockResolvedValueOnce(true);
                        return [4 /*yield*/, service.validateIfNotExistProductById(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('findById', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prismaServiceMock.product.findFirst.mockResolvedValueOnce(true);
                    return [4 /*yield*/, service.findById(1)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete', function () { return __awaiter(void 0, void 0, void 0, function () {
        var param;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prismaServiceMock.product.findFirst.mockResolvedValueOnce(true);
                    param = {
                        id: '123'
                    };
                    return [4 /*yield*/, service["delete"](param)];
                case 1:
                    _a.sent();
                    expect(prismaServiceMock.product["delete"]).toHaveBeenCalledWith({
                        where: { id: +param.id }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Create', function () {
        it('should throw an error if  exist product by name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaServiceMock.product.findFirst.mockResolvedValueOnce(product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service.create(product)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        expect(error_2.response).toEqual(product.name + " is already exist");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should run without problem', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaServiceMock.product.findFirst.mockReturnValueOnce(false);
                        return [4 /*yield*/, service.create(__assign({}, product))];
                    case 1:
                        _a.sent();
                        expect(prismaServiceMock.product.create).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Update', function () {
        var param = __assign({ id: '1' }, product);
        it('should throw an error if  exist product by name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaServiceMock.product.findFirst.mockResolvedValueOnce(product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, service.update(param)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        expect(error_3.response).toEqual(product.name + " is already exist");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should run without problem', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaServiceMock.product.findFirst.mockReturnValueOnce(false);
                        return [4 /*yield*/, service.update(param)];
                    case 1:
                        _a.sent();
                        expect(prismaServiceMock.product.create).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
