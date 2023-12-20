import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGVvQGVtYWlsLmNvbSIsImlkIjoxLCJuYW1lIjoiTWF0ZW8gWmFwYXRhIiwiaWF0IjoxNzAzMTA0NDY2LCJleHAiOjE3MDMxMDgwNjZ9.D7dDMsH_ZEhTMV2C-vRlKOJxEyneIDd7CLHKkpjvnYc`;

const newUser = {
  email: 'mateo.zapata@test.com',
  name: 'mateo zapata',
  password: 'monica123',
};

const prismaMock = {
  user: {
    findMany: jest.fn(),
    create: jest.fn(),
    findFirst: jest.fn(),
  },
};

const jwtServiceMock = {
  sign: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return each user from database', async () => {
    const query = [newUser];
    prismaMock.user.findMany.mockResolvedValueOnce(query);
    const response = await service.getAllUsers();
    expect(response).toEqual(query);
  });

  describe('CreateNewUser', () => {
    it('should create a new user', async () => {
      const params = {
        email: 'mateo.zapata@test.com',
        password: 'teo',
        name: 'mateo zapata',
      };
      prismaMock.user.create.mockResolvedValueOnce(params);
      const response = await service.createNewUser(params);
      expect(response).toEqual(params);
    });

    it('should throw an error when exist user ', async () => {
      prismaMock.user.findFirst.mockResolvedValueOnce(newUser);
      const params = {
        email: 'mateo.zapata@test.com',
        password: 'teo',
        name: 'mateo zapata',
      };
      try {
        await service.createNewUser(params);
      } catch (error) {
        expect(error.response.error).toEqual(
          'mateo.zapata@test.com is already exist',
        );
      }
    });
  });

  describe('SignIn', () => {
    it('should sign-in without problems', async () => {
      const params = {
        email: 'mateo.zapata@test.com',
        password: 'teo',
      };
      prismaMock.user.findFirst.mockResolvedValueOnce(newUser);
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);
      jwtServiceMock.sign.mockReturnValueOnce(token);

      const response = await service.signIn(params);
      expect(response).toEqual(token);
    });

    it('should throw an error if not match password', async () => {
      const params = {
        email: 'mateo.zapata@test.com',
        password: 'teo',
      };
      prismaMock.user.findFirst.mockResolvedValueOnce(newUser);
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
      jwtServiceMock.sign.mockReturnValueOnce(token);

      try {
        await service.signIn(params);
      } catch (error) {
        expect(error.response.error).toEqual(
          'Email or Password are invalid, try again',
        );
      }
    });

    it('should throw an error if user not exist', async () => {
      const params = {
        email: 'mateo.zapata@test.com',
        password: 'teo',
      };
      prismaMock.user.findFirst.mockReturnValueOnce(false);
      try {
        await service.signIn(params);
      } catch (error) {
        expect(error.response.error).toEqual(
          'mateo.zapata@test.com not exist in our platform',
        );
      }
    });
  });
});
