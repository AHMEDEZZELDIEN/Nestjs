import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseDto> {
    return next.handle().pipe(
      map((data) => {
        // If the data is already an ApiResponseDto, return it as is
        if (data instanceof ApiResponseDto) {
          return data;
        }

        // Otherwise, wrap it in a success response
        return {
          data: data,
          status: {
            status: true,
            code: 200,
            messages: 'OK',
          },
        };
      }),
    );
  }
}
