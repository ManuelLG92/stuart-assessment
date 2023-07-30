import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthController {
	@Get()
	check(@Res() response: Response) {
		response.status(200).json({ status: 'OK' });
	}
}
