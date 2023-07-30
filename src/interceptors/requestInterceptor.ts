import {
	CallHandler,
	ExecutionContext,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
export class RequestInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<any> | Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest<Request>();
		const { method, hostname } = request;
		const path = request.route?.path ?? request.path;
		const body = request.body;
		const params = request.params;
		const query = request.query;
		const baseUrl = `${hostname}${path}`;
		return next.handle().pipe(
			tap(() => {
				const response = context.switchToHttp().getResponse<Response>();

				const { statusCode } = response;
				const duration = Date.now() - request['startTime'];

				Logger.log({
					requestId: request['requestId'],
					baseUrl,
					method,
					duration: `${duration}ms`,
					statusCode,
					...(body ? { body } : {}),
					...(typeof params === 'object' && Object.keys(params).length
						? { params }
						: {}),
					...(typeof query === 'object' && Object.keys(query).length
						? { query }
						: {}),
				});
			}),
		);
	}
}
