import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dto/CreateUser.dto";
import { UpdateUserDto } from "src/dto/UpdateUser.dto";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class UserRepository{
  constructor(
    @InjectModel(User.name)
    private readonly userModel : Model<UserDocument>
  ) {}

  async findOneWithPassword(email : string, password : string): Promise<User> {
    const FoundUser : User = await this.userModel.findOne({email:email, password:password});
    return FoundUser;
  }

  async findOneWithName(email : string, name : string) : Promise<User>{
    const FoundUser : User = await this.userModel.findOne({email:email, name:name});
    return FoundUser;
  }

  async createOne(createUserDto : CreateUserDto) : Promise<void>{
    await this.userModel.create(createUserDto);
  }

  async updatePassword(updateUserDto : UpdateUserDto) : Promise<void>{
    const getUserOption = {
      email : updateUserDto.email,
      password : updateUserDto.password
    };
    const updateUserOption = {
      password : updateUserDto.modifyPassword
    }
    await this.userModel.findOneAndUpdate(
      getUserOption,
      updateUserOption,
      {
        new: true,
        upsert: true
      }
    );
  }
}
