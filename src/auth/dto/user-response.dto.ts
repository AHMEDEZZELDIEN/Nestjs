import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  phone?: string;

  @Expose()
  type: string;

  @Expose()
  type_name: string;

  @Expose()
  @Transform(({ value }) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return new Date(value as string | number).toISOString();
  })
  createdAt: string;

  @Expose()
  @Transform(({ value }) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return new Date(value as string | number).toISOString();
  })
  updatedAt: string;
}
