import {
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ResetCourierUseCase } from 'src/courier/application/use-cases/resetCourierUseCase';
import { courierConstants } from 'src/courier/courier.constants';

@Controller(courierConstants.endpoints.base)
export class ResetCourierCapacityController {
	constructor(private readonly useCase: ResetCourierUseCase) {}
	@Post(':id/reset-capacity')
	@HttpCode(HttpStatus.OK)
	async execute(@Param('id') id: string): Promise<void> {
		await this.useCase.execute(parseInt(id));
	}
}
