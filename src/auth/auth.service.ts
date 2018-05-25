import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async login(authDto: AuthDto) {
    const token = {token: jwt.sign({
      username: authDto.username,
      exp: Math.round(new Date().getTime() / 1000) + 604800,
    }, 'secret')};
    return token;
  }

  async signup(authDto: AuthDto) {
    return authDto;
  }
}