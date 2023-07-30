import { Inject, Injectable } from '@nestjs/common';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { ParentUseCaseInterface } from 'src/courier/application/use-cases/contracts/parentUseCase.interface';
import { courierConstants } from 'src/courier/courier.constants';
import { CommonCourierDto } from 'src/courier/infrastructure/controllers/rest/dto/commonCourier.dto';

@Injectable()
export class UpdateCourierCapacityUseCase
	implements ParentUseCaseInterface<CommonCourierDto, void>
{
	constructor(
		@Inject(courierConstants.repository)
		private readonly repository: CourierRepository,
	) {}
	async execute({ id, max_capacity: capacity }: CommonCourierDto) {
		const courier = await this.repository.findById(id);
		courier.setCapacity(capacity);
		await this.repository.upsert(courier);
	}
}
