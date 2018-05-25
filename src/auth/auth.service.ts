import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(authDto: AuthDto) {
    const user = await this.userService.findOne(authDto);
    if (user) {
      const token = {token: jwt.sign({
        username: authDto.username,
        exp: Math.round(new Date().getTime() / 1000) + 604800,
      }, 'secret')};
      return token;
    }
    return {error: 'User not found!'};
  }

  async signup(authDto: AuthDto) {
    return authDto;
  }
}