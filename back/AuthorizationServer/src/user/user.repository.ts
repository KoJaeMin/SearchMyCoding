import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dto/CreateUser.dto";
import { UpdateUserDto } from "src/dto/UpdateUser.dto";
import { User, UserDocument } from "src/schemas/user.schema";
import { getPropertyOfDifferenceSet } from "src/utils/format";

@Injectable()
export class UserRepository{
  constructor(
    @InjectModel(User.name)
    private readonly userModel : Model<UserDocument>
  ) {}

  async findOneWithId(id : string) : Promise<User>{
    return await this.userModel.findOne({id : id});
  }

  async findOneWithEmail(email : string) : Promise<User>{
    return await this.userModel.findOne({email:email});
  }

  async createOne(createUserDto : CreateUserDto) : Promise<void>{
    await this.userModel.create(createUserDto);
  }

  async updateUser(updateUserDto : UpdateUserDto) : Promise<void>{
    const getUserOption = {
      id : updateUserDto.id,
      password : updateUserDto.password
    };
    const updateUserOption = getPropertyOfDifferenceSet(updateUserDto, getUserOption);
    await this.userModel.findOneAndUpdate(
      getUserOption,
      updateUserOption,
      {
        new: false,
        upsert: true
      }
    );
  }
}
