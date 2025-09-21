import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

export class AuthDataDto {
  @Expose()
  token: string;

  @Expose()
  type: string;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  constructor(token: string, user: UserResponseDto, type: string = 'Bearer') {
    this.token = token;
    this.type = type;
    this.user = user;
  }
}
