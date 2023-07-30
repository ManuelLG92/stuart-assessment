import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { IncreaseCourierCapacityUseCase } from 'src/courier/application/use-cases/increaseCourierCapacityUseCase';
import { courierConstants } from 'src/courier/courier.constants';
import { IncreaseCapacityCourierDto } from 'src/courier/infrastructure/controllers/rest/dto/increaseCapacityCourier.dto';

@Controller(courierConstants.endpoints.base)
export class IncreaseCourierCapacityController {
	constructor(private readonly useCase: IncreaseCourierCapacityUseCase) {}
	@Post(':id/increase-capacity')
	@HttpCode(HttpStatus.OK)
	async execute(
		@Param('id') id: string,
		@Body() dto: IncreaseCapacityCourierDto,
	): Promise<void> {
		await this.useCase.execute({
			id: parseInt(id),
			capacity: dto.capacity,
		});
	}
}
