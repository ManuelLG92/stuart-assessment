import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class RequestLoggerMiddleware implements NestMiddleware {
	use(request: Request, response: Response, next: NextFunction): void {
		request['requestId'] = uuidv4();
		request['startTime'] = Date.now();
		next();
	}
}
