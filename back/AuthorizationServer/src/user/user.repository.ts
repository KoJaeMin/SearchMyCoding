import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { DataSource, Repository } from "typeorm";

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
}
