import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() authDto: AuthDto) {
    const authRes = await this.authService.login(authDto);
    return authRes;
  }
  @Post('/signup')
  async signup(@Body() authDto: AuthDto) {
    const authRes = await this.authService.signup(authDto);
    return authRes;
  }
}
