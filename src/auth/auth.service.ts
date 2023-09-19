import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { loginS } from '../../typeors';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(loginS) private readonly loginRepository: Repository<loginS>,private usersService: UsersService,private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    const CreateloginDto = {
      username:username
    }
    const newlogin = this.loginRepository.create(CreateloginDto);
    this.loginRepository.save(newlogin)
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.user_id};


    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
