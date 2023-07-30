import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateCourierUseCase } from 'src/courier/application/use-cases/createCourierUseCase';
import { courierConstants } from 'src/courier/courier.constants';
import { CommonCourierDto } from 'src/courier/infrastructure/controllers/rest/dto/commonCourier.dto';

@Controller(courierConstants.endpoints.base)
export class CreateCourierController {
	constructor(private readonly useCase: CreateCourierUseCase) {}
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createCourierDto: CommonCourierDto): Promise<void> {
		await this.useCase.execute(createCourierDto);
	}
}
