import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dto/CreateUser.dto";
import { GetUserDto } from "src/dto/GetUser.dto";
import { UpdateUserDto } from "src/dto/UpdateUser.dto";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class UserRepository{
  constructor(
    @InjectModel(User.name)
    private readonly userModel : Model<UserDocument>
  ) {}

  async findOne(email : string, password : string): Promise<User> {
    const FoundUser : User = await this.userModel.findOne({email:email, password:password});
    return FoundUser;
  }

  async findOneWithoutPassword(email : string, name : string) : Promise<User>{
    const FoundUser : User = await this.userModel.findOne({email:email, name:name});
    return FoundUser;
  }

  async createOne(createUserDto : CreateUserDto) : Promise<void>{
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
  }

  async updatePassword(GetUserDto : GetUserDto, updateUserDto : UpdateUserDto){
    await this.userModel.findOneAndUpdate(
      GetUserDto,
      updateUserDto,
      {
        new: true,
        upsert: true
      }
    );
  }
}
