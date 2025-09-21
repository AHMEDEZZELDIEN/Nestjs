import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthDataDto } from './dto/auth-data.dto';
import { ResponseBuilder, ApiResponseInterceptor } from '../common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/v1/user')
@UseInterceptors(ApiResponseInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('login')
  async login(@Body() req: LoginDto) {
    const { user, token } = await this.authService.login(req);
    const userResponse = Object.assign(new UserResponseDto(), user);
    return {
      token: token,
      type: 'Bearer',
      user: userResponse,
    };
  }

  @Post('register')
  async register(@Body() req: RegisterDto) {
    const { user, token } = await this.authService.register(req);
    const userResponse = Object.assign(new UserResponseDto(), user);
    return {
      token: token,
      type: 'Bearer',
      user: userResponse,
    };
  }

  @Post('me')
  async getMe(@Body() req: any) {
    const user = await this.authService.getMe(req);
    const userResponse = Object.assign(new UserResponseDto(), user);
    return {
      user: userResponse,
    };
  }
}
