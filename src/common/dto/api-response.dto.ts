import { Expose, Type } from 'class-transformer';

export class StatusDto {
  @Expose()
  status: boolean;

  @Expose()
  code: number;

  @Expose()
  messages: string;

  constructor(
    status: boolean = true,
    code: number = 200,
    messages: string = 'OK',
  ) {
    this.status = status;
    this.code = code;
    this.messages = messages;
  }
}

export class ApiResponseDto<T = any> {
  @Expose()
  data: T;

  @Expose()
  @Type(() => StatusDto)
  status: StatusDto;

  constructor(data: T, statusObj?: StatusDto) {
    this.data = data;
    this.status = statusObj || new StatusDto();
  }

  // Static factory methods for common responses
  static success<T>(data: T, message: string = 'OK'): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(true, 200, message));
  }

  static error<T = null>(
    message: string,
    code: number = 400,
    data: T = null as T,
  ): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(false, code, message));
  }

  static created<T>(data: T, message: string = 'Created'): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(true, 201, message));
  }

  static unauthorized<T = null>(
    message: string = 'Unauthorized',
    data: T = null as T,
  ): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(false, 401, message));
  }

  static forbidden<T = null>(
    message: string = 'Forbidden',
    data: T = null as T,
  ): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(false, 403, message));
  }

  static notFound<T = null>(
    message: string = 'Not Found',
    data: T = null as T,
  ): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(false, 404, message));
  }
}