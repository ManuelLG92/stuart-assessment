import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
} from '@nestjs/common';
import { UpdateCourierCapacityUseCase } from 'src/courier/application/use-cases/updateCourierCapacityUseCase';
import { courierConstants } from 'src/courier/courier.constants';
import { MaxCapacityCourierDto } from 'src/courier/infrastructure/controllers/rest/dto/maxCapacityCourier.dto';

@Controller(courierConstants.endpoints.base)
export class UpdateCourierCapacityController {
	constructor(private readonly useCase: UpdateCourierCapacityUseCase) {}
	@Patch(':id/update-capacity')
	@HttpCode(HttpStatus.OK)
	async execute(
		@Param('id') id: string,
		@Body() dto: MaxCapacityCourierDto,
	): Promise<void> {
		await this.useCase.execute({
			id: parseInt(id),
			max_capacity: dto.max_capacity,
		});
	}
}
