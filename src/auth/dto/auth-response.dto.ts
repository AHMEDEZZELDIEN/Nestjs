import { UserResponseDto } from './user-response.dto';

export class AuthResponseDto {
  user: UserResponseDto;
  message: string;
  
  constructor(user: UserResponseDto, message: string = 'Success') {
    this.user = user;
    this.message = message;
  }
}
