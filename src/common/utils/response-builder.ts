import { ApiResponseDto, StatusDto } from '../dto/api-response.dto';

export class ResponseBuilder {
  /**
   * Create a successful response
   */
  static success<T>(data: T, message: string = 'Operation successful'): ApiResponseDto<T> {
    return ApiResponseDto.success(data, message);
  }

  /**
   * Create a created response (201)
   */
  static created<T>(data: T, message: string = 'Resource created successfully'): ApiResponseDto<T> {
    return ApiResponseDto.created(data, message);
  }

  /**
   * Create an error response
   */
  static error<T = null>(
    message: string,
    code: number = 400,
    data: T = null as T,
  ): ApiResponseDto<T> {
    return ApiResponseDto.error(message, code, data);
  }

  /**
   * Create an unauthorized response (401)
   */
  static unauthorized<T = null>(
    message: string = 'Unauthorized access',
    data: T = null as T,
  ): ApiResponseDto<T> {
    return ApiResponseDto.unauthorized(message, data);
  }

  /**
   * Create a forbidden response (403)
   */
  static forbidden<T = null>(
    message: string = 'Access forbidden',
    data: T = null as T,
  ): ApiResponseDto<T> {
    return ApiResponseDto.forbidden(message, data);
  }

  /**
   * Create a not found response (404)
   */
  static notFound<T = null>(
    message: string = 'Resource not found',
    data: T = null as T,
  ): ApiResponseDto<T> {
    return ApiResponseDto.notFound(message, data);
  }

  /**
   * Create a custom response
   */
  static custom<T>(
    data: T,
    status: boolean,
    code: number,
    message: string,
  ): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(status, code, message));
  }

  /**
   * Create a validation error response (422)
   */
  static validationError<T = null>(
    message: string = 'Validation failed',
    data: T = null as T,
  ): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(false, 422, message));
  }

  /**
   * Create an internal server error response (500)
   */
  static internalError<T = null>(
    message: string = 'Internal server error',
    data: T = null as T,
  ): ApiResponseDto<T> {
    return new ApiResponseDto(data, new StatusDto(false, 500, message));
  }
}