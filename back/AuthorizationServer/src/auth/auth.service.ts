import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) {}
      async validateUser(id: string, password: string) : Promise<any> {
        try{
            const user = await this.usersService.getUserWithPassword(id, password);
            return {
                id : user.id,
                name : user.name,
                email : user.email
            }
        }catch(err){
            throw new BadRequestException("User doesn't exist or Enter wrong information");
        }
      }
}
