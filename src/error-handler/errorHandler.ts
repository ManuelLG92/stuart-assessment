import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(Error)
export class ErrorHandler implements ExceptionFilter {
	catch(exception: Error, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status =
			exception instanceof HttpException ? exception.getStatus() : 500;
		Logger.error(
			JSON.stringify({ request_id: request['requestId'], ...exception }),
		);
		response.status(status).json({
			...(exception['response']
				? { ...exception['response'] }
				: { message: exception.message, status, statusCode: status }),
		});
	}
}
