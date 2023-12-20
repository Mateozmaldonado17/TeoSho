import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';

const email = 'test@test.com';
const password = 'Mateo123!!';
let token = '';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should /user (GET)  return a list of users', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect((response) => {
        expect(typeof response).toEqual('object');
      });
  });

  it('should /user (POST) create a new user', () => {
    return request(app.getHttpServer())
      .post('/user')
      .expect(201)
      .send({
        password,
        email,
        name: 'Testing this project',
      })
      .expect((response) => {
        const result = JSON.parse(response.text);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('password');
        expect(result).toHaveProperty('name');
      });
  });

  it('should /user/sign-in (POST) sign-in', () => {
    return request(app.getHttpServer())
      .post('/user/sign-in')
      .expect(201)
      .send({
        password,
        email,
      })
      .expect((response) => {
        token = response.text;
      });
  });

  it('should /user (PUT) update user information', () => {
    return request(app.getHttpServer())
      .put('/user')
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email,
        name: 'Testing this new change :)',
      })
      .expect((response) => {
        const result = JSON.parse(response.text);
        token = result.token;
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('token');
      });
  });
});
