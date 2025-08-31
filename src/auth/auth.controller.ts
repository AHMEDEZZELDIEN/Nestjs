import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('v1/user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('login')
  @UseInterceptors(new TransformInterceptor(AuthResponseDto))
  async login(@Body() req: LoginDto) {
    const user = await this.authService.login(req);
    const userResponse = Object.assign(new UserResponseDto(), user);
    return new AuthResponseDto(userResponse, 'Login successful');
  }

  @Post('register')
  @UseInterceptors(new TransformInterceptor(AuthResponseDto))
  async register(@Body() req: RegisterDto) {
    const user = await this.authService.register(req);
    const userResponse = Object.assign(new UserResponseDto(), user);
    return new AuthResponseDto(userResponse, 'Registration successful');
  }
}
