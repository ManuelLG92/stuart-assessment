import { Inject, Injectable } from '@nestjs/common';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { ParentUseCaseInterface } from 'src/courier/application/use-cases/contracts/parentUseCase.interface';
import {
	CourierResponseDto,
	CourierResponseMapper,
} from 'src/courier/application/use-cases/mapper/courierResponseMapper';
import { courierConstants } from 'src/courier/courier.constants';
@Injectable()
export class LookupCouriersUseCase
	implements
		ParentUseCaseInterface<number, ReadonlyArray<CourierResponseDto>>
{
	constructor(
		@Inject(courierConstants.repository)
		private readonly courierRepository: CourierRepository,
	) {}
	async execute(
		capacity: number,
	): Promise<ReadonlyArray<CourierResponseDto>> {
		const couriers = await this.courierRepository.findByMaxCapacity(
			capacity,
		);
		return CourierResponseMapper.fromEntities(couriers);
	}
}
