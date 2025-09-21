import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

export class AuthResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @Expose()
  token: string;

  @Expose()
  message: string;

  constructor(
    user: UserResponseDto,
    token: string,
    message: string = 'Success',
  ) {
    this.user = user;
    this.token = token;
    this.message = message;
  }
}
