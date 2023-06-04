import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) {}
      async validateUser(id: string, password: string) : Promise<User> {
        try{
            const user : User = await this.usersService.getUserWithPassword(id, password);
            return user;
        }catch(err){
            throw new BadRequestException("User doesn't exist or Enter wrong information");
        }
      }
}
