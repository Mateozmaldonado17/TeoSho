"use strict";
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
var request = require("supertest");
var product_module_1 = require("../src/product/product.module");
var jwt_1 = require("@nestjs/jwt");
var nestjs_prisma_1 = require("nestjs-prisma");
var jwt_strategy_1 = require("../src/jwt.strategy");
var productId = '';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGVvQGVtYWlsLmNvbSIsImlkIjoxLCJuYW1lIjoiTWF0ZW8gWmFwYXRhIiwiaWF0IjoxNzAzMTI1Njg0LCJleHAiOjE3MDMxMjkyODR9.ekE5UTtpKZDlDho7AQub71HaZayK_88wVJ7IA60L-5o';
describe('ProductController (e2e)', function () {
    var app;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var moduleFixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        imports: [product_module_1.ProductModule],
                        providers: [jwt_1.JwtService, nestjs_prisma_1.PrismaService, jwt_strategy_1.JwtStrategy]
                    }).compile()];
                case 1:
                    moduleFixture = _a.sent();
                    app = moduleFixture.createNestApplication();
                    return [4 /*yield*/, app.init()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should /product (GET) get all products registered', function () {
        return request(app.getHttpServer())
            .get('/product')
            .expect(200)
            .expect(function (response) {
            expect(typeof response).toEqual('object');
        });
    });
    it('should /product/1 (GET) get all products registered', function () {
        return request(app.getHttpServer())
            .get('/product/1')
            .expect(200)
            .expect(function (response) {
            var data = JSON.parse(response.text);
            expect(data).toHaveProperty('id');
            expect(data).toHaveProperty('name');
            expect(data).toHaveProperty('description');
            expect(data).toHaveProperty('price');
            expect(data).toHaveProperty('image');
        });
    });
    it('should /product (POST) create new product', function () {
        return request(app.getHttpServer())
            .post('/product')
            .expect(201)
            .set('Authorization', "Bearer " + token)
            .send({
            name: 'test',
            description: 'test description',
            image: 'image.jpg',
            price: '200.12'
        })
            .expect(function (response) {
            var data = JSON.parse(response.text);
            productId = data.id;
            console.log(productId);
            expect(data).toHaveProperty('id');
            expect(data).toHaveProperty('name');
            expect(data).toHaveProperty('description');
            expect(data).toHaveProperty('price');
            expect(data).toHaveProperty('image');
        });
    });
    it('should /product (PATCH) update a product', function () {
        return request(app.getHttpServer())
            .patch('/product')
            .expect(200)
            .set('Authorization', "Bearer " + token)
            .send({
            id: productId,
            name: 'test aaa',
            description: 'test description',
            image: 'image.jpg',
            price: '200.12'
        })
            .expect(function (response) {
            var data = JSON.parse(response.text);
            expect(data).toHaveProperty('id');
            expect(data).toHaveProperty('name');
            expect(data).toHaveProperty('description');
            expect(data).toHaveProperty('price');
            expect(data).toHaveProperty('image');
        });
    });
    it('should /product (DELETE) delete a product', function () {
        return request(app.getHttpServer())["delete"]('/product')
            .expect(200)
            .set('Authorization', "Bearer " + token)
            .send({
            id: productId
        });
    });
});
