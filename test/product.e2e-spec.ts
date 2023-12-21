import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from '../src/product/product.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { JwtStrategy } from '../src/jwt.strategy';

let productId = '';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGVvQGVtYWlsLmNvbSIsImlkIjoxLCJuYW1lIjoiTWF0ZW8gWmFwYXRhIiwiaWF0IjoxNzAzMTI1Njg0LCJleHAiOjE3MDMxMjkyODR9.ekE5UTtpKZDlDho7AQub71HaZayK_88wVJ7IA60L-5o';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      providers: [JwtService, PrismaService, JwtStrategy],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should /product (GET) get all products registered', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect((response) => {
        expect(typeof response).toEqual('object');
      });
  });

  it('should /product/1 (GET) get all products registered', () => {
    return request(app.getHttpServer())
      .get('/product/1')
      .expect(200)
      .expect((response) => {
        const data = JSON.parse(response.text);
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('description');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('image');
      });
  });

  it('should /product (POST) create new product', () => {
    return request(app.getHttpServer())
      .post('/product')
      .expect(201)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test description',
        image: 'image.jpg',
        price: '200.12',
      })
      .expect((response) => {
        const data = JSON.parse(response.text);
        productId = data.id;
        console.log(productId);
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('description');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('image');
      });
  });

  it('should /product (PATCH) update a product', () => {
    return request(app.getHttpServer())
      .patch('/product')
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: productId,
        name: 'test aaa',
        description: 'test description',
        image: 'image.jpg',
        price: '200.12',
      })
      .expect((response) => {
        const data = JSON.parse(response.text);
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('description');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('image');
      });
  });

  it('should /product (DELETE) delete a product', () => {
    return request(app.getHttpServer())
      .delete('/product')
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: productId,
      });
  });
});
