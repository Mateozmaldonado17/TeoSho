import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ShopModule } from '../src/shop/shop.module';
import { JwtStrategy } from '../src/jwt.strategy';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGVvQGVtYWlsLmNvbSIsImlkIjoxLCJuYW1lIjoiTWF0ZW8gWmFwYXRhIiwiaWF0IjoxNzAzMTM1MDAzLCJleHAiOjE3MDMxMzg2MDN9.CV8OBViybzpoc-JgJHeEr7NAXm_mqoIz4ACKdCJQDLQ`;

describe('ShopController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ShopModule],
      providers: [JwtStrategy],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should /shop (GET) get all my shops', () => {
    return request(app.getHttpServer())
      .get('/shop')
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
      .expect((response) => {
        const result = JSON.parse(response.text);
        expect(typeof result).toEqual('object');
      });
  });

  it('should /shop (POST) create shops', () => {
    return request(app.getHttpServer())
      .post('/shop')
      .expect(201)
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          {
            price: '256.80',
            productId: 1,
          },
          {
            price: '121.99',
            productId: 1,
          },
        ],
      })
      .expect((response) => {
        const result = JSON.parse(response.text);
        expect(result.count).toEqual(2);
      });
  });
});
