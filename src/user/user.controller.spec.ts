import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto, UserController } from './user.controller';
import { UserService } from './user.service';

const newUser: CreateUserDto = {
  email: 'mateo.zapata@test.com',
  name: 'mateo zapata',
  password: 'monica123',
};

const userServiceMock = {
  getAllUsers: jest.fn(),
  createNewUser: jest.fn(),
  signIn: jest.fn(),
  updateInformation: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should getAllUsers run correctly', async () => {
    await controller.getAllUsers();
    expect(userServiceMock.getAllUsers).toHaveBeenCalled();
  });

  it('should createNewUser run correctly', async () => {
    await controller.createNewUser(newUser);
    expect(userServiceMock.createNewUser).toHaveBeenCalledWith(newUser);
  });

  it('should signIn run correctly', async () => {
    await controller.signIn(newUser);
    expect(userServiceMock.signIn).toHaveBeenCalledWith(newUser);
  });

  it('should updateInformation run correctly', async () => {
    const tokenData = {
      email: 'mateo.zapata@test.com',
      id: 1,
    };

    await controller.updateInformation(newUser, tokenData);
    expect(userServiceMock.updateInformation).toHaveBeenCalled();
  });
});
