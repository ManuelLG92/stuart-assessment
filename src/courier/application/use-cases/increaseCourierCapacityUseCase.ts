import { Inject, Injectable } from '@nestjs/common';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { ParentUseCaseInterface } from 'src/courier/application/use-cases/contracts/parentUseCase.interface';
import { courierConstants } from 'src/courier/courier.constants';
import { IncreaseCapacityCourierDto } from 'src/courier/infrastructure/controllers/rest/dto/increaseCapacityCourier.dto';

type InputDto = { id: number } & IncreaseCapacityCourierDto;
@Injectable()
export class IncreaseCourierCapacityUseCase
	implements ParentUseCaseInterface<InputDto, void>
{
	constructor(
		@Inject(courierConstants.repository)
		private readonly repository: CourierRepository,
	) {}
	async execute({ id, capacity }: InputDto) {
		const courier = await this.repository.findById(id);
		courier.addCapacity(capacity);
		await this.repository.upsert(courier);
	}
}
