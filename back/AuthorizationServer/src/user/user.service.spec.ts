import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';


describe('UserService', () => {
  let service: UserService;
  let userRepository : UserRepository;
  let mockUser : User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        {
          provide:getModelToken(User.name),
          useFactory: ()=>{}
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(
      UserRepository
    );

    mockUser = {
      id : 'example@abc.abc',
      name : 'test',
      password : '125d6d03b32c84d492747f79cf0bf6e179d287f341384eb5d6d3197525ad6be8e6df0116032935698f99a09e265073d1d6c32c274591bf1d0a20ad67cba921bc'
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser',()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockErrorEmail : string = 'helloworld';

    it('should find a user', async ()=>{
      jest.spyOn(userRepository, "findOne").mockResolvedValue(mockUser);
      
      const result : User = await service.getUser(mockEmail);
      
      expect(result.id).toEqual(mockEmail);
    });

    it("should return a BadRequestException", async () => {
      try{
        await service.getUser(mockErrorEmail);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('getUserWithPassword',()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockPassword : string = 'test';
    const mockErrorEmail : string = 'helloworld';

    it('should find a user with password', async ()=>{
      jest
        .spyOn(userRepository, "findOneWithPassword")
        .mockResolvedValue(mockUser);
      
      const result : User = await service.getUserWithPassword(mockEmail, mockPassword);
      
      expect(result.id).toEqual(mockEmail);
    });

    it("should return a BadRequestException", async () => {
      try{
        await service.getUserWithPassword(mockErrorEmail, mockPassword);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('getUserWithName', ()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockName : string = 'test';
    const mockErrorEmail : string = 'helloworld';

    it('should find a user with name', async ()=>{
      jest
        .spyOn(userRepository, "findOneWithName")
        .mockResolvedValue(mockUser);
      const result : User = await service.getUserWithName(mockEmail, mockName);
      
      expect(result.id).toEqual(mockEmail);
      expect(result.name).toEqual(mockName);
    });

    it("should return a BadRequestException", async () => {
      try{
        await service.getUserWithName(mockErrorEmail, mockName);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('changeDefaultPassword', ()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockName : string = 'test';

    const mockUpdateUserWithDefaultPassword : User = {
      id : 'example@abc.abc',
      name : 'test',
      password : '640ab86890ccc2b38d0fda471e9defa59967a22d594a9e21df77212302bb8518ec6eaa3e559a7d6e1ce7d7f33936b80d888123ea48a1931ac61830d5d854616b'
    };

    it("should update user password to default password", async()=>{
      jest.spyOn(userRepository, "findOneWithName").mockResolvedValue(mockUser);
      const BeforeUpdate : User = await service.getUserWithName(mockEmail, mockName);

      jest.spyOn(userRepository, "updatePassword").mockResolvedValue();
      const result = await service.changeDefaultPassword(BeforeUpdate);
      
      jest.spyOn(userRepository, "findOneWithName").mockResolvedValue(mockUpdateUserWithDefaultPassword);
      const AfterUpdate : User = await service.getUserWithName(mockEmail, mockName);

      expect(BeforeUpdate.id).toEqual(AfterUpdate.id);
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

    it("should create a user", async () => {
      jest.spyOn(userRepository, "findOneWithName").mockResolvedValue(undefined);
      jest.spyOn(userRepository, "createOne").mockResolvedValue();
      const result = await service.addUser(mockcreateUserDto);

      jest.spyOn(userRepository, "findOneWithName").mockResolvedValue(mockUser);
      const AfterCreate : User = await service.getUserWithName(mockEmail, mockName);

      expect(AfterCreate.id).toEqual(mockcreateUserDto.email);
      expect(AfterCreate.name).toEqual(mockcreateUserDto.name);
    });
  });

  describe("UpdatePassword", ()=>{
    const mockEmail : string = 'example@abc.abc';
    const mockPassword : string = 'test';
    const mockUpdatePassword : string = 'test';
    const mockUpdateUserDto : UpdateUserDto = {
      id : mockEmail,
      password : mockPassword,
      modifyPassword : mockUpdatePassword
    };
    const mockUpdateUser : User = {
      id : 'example@abc.abc',
      name : 'test',
      password : '640ab86890ccc2b38d0fda471e9defa59967a22d594a9e21df77212302bb8518ec6eaa3e559a7d6e1ce7d7f33936b80d888123ea48a1931ac61830d5d854616b'
    };
    it("should update a user", async ()=>{
      jest.spyOn(userRepository, "findOneWithPassword").mockResolvedValue(mockUser);
      const BeforeUpdate : User = await service.getUserWithPassword(mockEmail, mockPassword);

      jest.spyOn(userRepository, "updatePassword").mockResolvedValue();
      const result = await service.updateUser(mockUpdateUserDto);

      jest.spyOn(userRepository, "findOneWithPassword").mockResolvedValue(mockUpdateUser);
      const AfterUpdate : User = await service.getUserWithPassword(mockEmail, mockUpdatePassword);

      expect(BeforeUpdate.id).toEqual(AfterUpdate.id);
      expect(BeforeUpdate.name).toEqual(AfterUpdate.name);
    })
  })

});
