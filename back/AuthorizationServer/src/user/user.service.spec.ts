import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { GetUserDto } from 'src/dto/GetUser.dto';
import { GetUserWithoutPasswordDto } from 'src/dto/GetUserWithoutPassword.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

type MockRepository = Partial<Record<keyof UserRepository, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let userRepository : MockRepository;
  let mockUser : User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        {
          provide:getModelToken(User.name),
          useValue: mockUserRepository()
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository>(
      getModelToken(User.name)
    );

    mockUser = {
      email : 'example@abc.abc',
      name : 'test',
      password : '125d6d03b32c84d492747f79cf0bf6e179d287f341384eb5d6d3197525ad6be8e6df0116032935698f99a09e265073d1d6c32c274591bf1d0a20ad67cba921bc'
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser',()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockPassword : string = 'test';
    const mockErrorEmail : string = 'helloworld';

    it('should find a user', async ()=>{
      userRepository.findOne.mockResolvedValue(mockUser);
      
      const result : User = await service.getUser(mockEmail, mockPassword);
      
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(result.email).toEqual(mockEmail);
    });

    it("should return a BadRequestException", async () => {
      try{
        await service.getUser(mockErrorEmail, mockPassword);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('getUserWithoutPassword', ()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockName : string = 'test';
    const mockErrorEmail : string = 'helloworld';
    const mockGetUserWithoutPasswordDto : GetUserWithoutPasswordDto = {
      email : mockEmail,
      name : mockName
    }
    const mockErrorGetUserWithoutPasswordDto : GetUserWithoutPasswordDto = {
      email : mockErrorEmail,
      name : mockName
    }


    it('should find a user without password', async ()=>{
      /// 여기서 userRepository는 UserModel을 가진 Repository이다.
      /// 그러므로 findOneWithoutPassword에서 findOne을 사용하기에 findOneWithoutPassword 대신 findOne을 사용해야 한다.
      userRepository.findOne.mockResolvedValue(mockUser);
      
      const result : User = await service.getUserWithoutPassword(mockGetUserWithoutPasswordDto);
      
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(result.email).toEqual(mockEmail);
      expect(result.name).toEqual(mockName);
    });

    it("should return a BadRequestException", async () => {
      try{
        await service.getUserWithoutPassword(mockErrorGetUserWithoutPasswordDto);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('changeDefaultPassword', ()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockName : string = 'test';
    const mockErrorEmail : string = 'helloworld';
    const mockGetUserWithoutPasswordDto : GetUserWithoutPasswordDto = {
      email : mockEmail,
      name : mockName
    }

    const mockUpdateUserWithDefaultPassword : User = {
      email : 'example@abc.abc',
      name : 'test',
      password : '640ab86890ccc2b38d0fda471e9defa59967a22d594a9e21df77212302bb8518ec6eaa3e559a7d6e1ce7d7f33936b80d888123ea48a1931ac61830d5d854616b'
    };

    it("should update user password to default password", async()=>{
      userRepository.findOne.mockResolvedValue(mockUser);
      const BeforeUpdate : User = await service.getUserWithoutPassword(mockGetUserWithoutPasswordDto);
      expect(userRepository.findOne).toHaveBeenCalled();

      const result = await service.changeDefaultPassword(BeforeUpdate);

      userRepository.findOne.mockResolvedValue(mockUpdateUserWithDefaultPassword);
      const AfterUpdate : User = await service.getUserWithoutPassword(mockGetUserWithoutPasswordDto);
      expect(userRepository.findOne).toHaveBeenCalled();

      expect(BeforeUpdate.email).toEqual(AfterUpdate.email);
      expect(BeforeUpdate.name).toEqual(AfterUpdate.name);
    })
  });

  describe("SignUp", ()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockName : string = 'test';
    const mockcreateUserDto : CreateUserDto = {
      name : mockName,
      email: mockEmail,
      password : "test"
    };
    const mockGetUserWithoutPasswordDto : GetUserWithoutPasswordDto = {
      email : mockEmail,
      name : mockName
    }

    it("should create a user", async () => {
      const result = await service.signUp(mockcreateUserDto);

      userRepository.findOne.mockResolvedValue(mockUser);
      const AfterCreate : User = await service.getUserWithoutPassword(mockGetUserWithoutPasswordDto);
      expect(userRepository.findOne).toHaveBeenCalled();

      expect(AfterCreate.email).toEqual(mockcreateUserDto.email);
      expect(AfterCreate.name).toEqual(mockcreateUserDto.name);
    });
  });

  describe("UpdatePassword", ()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockPassword : string = 'test';
    const mockUpdatePassword : string = 'test';
    const mockUpdateUserDto : UpdateUserDto = {
      email : mockEmail,
      password : mockPassword,
      modifyPassword : mockUpdatePassword
    };
    const mockUpdateUser : User = {
      email : 'example@abc.abc',
      name : 'test',
      password : '640ab86890ccc2b38d0fda471e9defa59967a22d594a9e21df77212302bb8518ec6eaa3e559a7d6e1ce7d7f33936b80d888123ea48a1931ac61830d5d854616b'
    };
    it("should update a user", async ()=>{
      userRepository.findOne.mockResolvedValue(mockUser);
      const BeforeUpdate : User = await service.getUser(mockEmail, mockPassword);
      expect(userRepository.findOne).toHaveBeenCalled();

      const result = await service.updatePassword(mockUpdateUserDto);

      userRepository.findOne.mockResolvedValue(mockUpdateUser);
      const AfterUpdate : User = await service.getUser(mockEmail, mockUpdatePassword);
      expect(userRepository.findOne).toHaveBeenCalled();

      expect(BeforeUpdate.email).toEqual(AfterUpdate.email);
      expect(BeforeUpdate.name).toEqual(AfterUpdate.name);
    })
  })

});
