import { Controller, Get, Param } from '@nestjs/common';
import { GetCourierByIdUseCase } from 'src/courier/application/use-cases/getCourierByIdUseCase';
import { CourierResponseDto } from 'src/courier/application/use-cases/mapper/courierResponseMapper';
import { courierConstants } from 'src/courier/courier.constants';

@Controller(courierConstants.endpoints.base)
export class GetCourierByIdController {
	constructor(private readonly useCase: GetCourierByIdUseCase) {}

	@Get(':id')
	async findByMaxCapacity(
		@Param('id') id: number,
	): Promise<CourierResponseDto> {
		return this.useCase.execute(id);
	}
}
