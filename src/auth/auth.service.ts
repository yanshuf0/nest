import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import * as bcrpyt from 'bcrypt';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}

  async login(authDto: AuthDto) {
    const user = await this.userService.findOne(authDto);
    if (!user) {
      return {error: 'User not found!'};
    }
    const match = await bcrpyt.compare(authDto.password, user.password);
    if (match) {
      const token = {token: jwt.sign({
        username: authDto.username,
        exp: Math.round(new Date().getTime() / 1000) + 604800,
      }, 'secret')};
      return token;
    }
    return {error: 'Invalid password'};
  }

  async signup(authDto: AuthDto) {
    const hash = await bcrpyt.hash(authDto.password, 1);
    const user: any = {};
    user.username = authDto.username;
    user.password = hash;
    const res = await this.userService.create(user);
    return {message: 'success'};
  }
}