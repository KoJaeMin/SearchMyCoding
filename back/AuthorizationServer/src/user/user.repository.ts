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

  async findOne(email : string, password : string): Promise<User> {
    const User : User = await this.userModel.findOne({email:email, password:password});
    return User;
  }

  async creaateOne(createUserDto : CreateUserDto) : Promise<void>{
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
  }

  async updatePassword(updateUserDto : UpdateUserDto){
    await this.userModel.findOneAndUpdate({
      name : updateUserDto.name,
      email : updateUserDto.email
    },
    {
      password: updateUserDto.password
    },
    {
      new: true,
      upsert: true
    }
    );
  }
}
