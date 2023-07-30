import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { ParentUseCaseInterface } from 'src/courier/application/use-cases/contracts/parentUseCase.interface';
import {
	CourierResponseDto,
	CourierResponseMapper,
} from 'src/courier/application/use-cases/mapper/courierResponseMapper';
import { courierConstants } from 'src/courier/courier.constants';
@Injectable()
export class GetCourierByIdUseCase
	implements ParentUseCaseInterface<number, CourierResponseDto>
{
	constructor(
		@Inject(courierConstants.repository)
		private readonly courierRepository: CourierRepository,
	) {}
	async execute(id: number): Promise<CourierResponseDto> {
		const courier = await this.courierRepository.findById(id);
		return CourierResponseMapper.fromEntity(courier);
	}
}
