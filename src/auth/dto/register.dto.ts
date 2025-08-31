import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Matches,
  MinLength,
  MaxLength,
  IsDefined,
} from 'class-validator';

export class RegisterDto {
  @IsDefined({ message: 'Email is required' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsDefined({ message: 'Name is required' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsDefined({ message: 'Password is required' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(255, { message: 'Password must not exceed 255 characters' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @Matches(/^[+]?[1-9][\d]{0,15}$/, {
    message: 'Please provide a valid phone number',
  })
  phone?: string;
}
