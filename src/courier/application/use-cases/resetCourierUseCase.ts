import { Inject, Injectable } from '@nestjs/common';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { ParentUseCaseInterface } from 'src/courier/application/use-cases/contracts/parentUseCase.interface';
import { courierConstants } from 'src/courier/courier.constants';
import { Courier } from 'src/courier/domain/courier';
import { CommonCourierDto } from 'src/courier/infrastructure/controllers/rest/dto/commonCourier.dto';

@Injectable()
export class ResetCourierUseCase
	implements ParentUseCaseInterface<number, void>
{
	constructor(
		@Inject(courierConstants.repository)
		private readonly repository: CourierRepository,
	) {}
	async execute(id: number) {
		const courier = await this.repository.findById(id);
		courier.resetCapacity();
		await this.repository.upsert(courier);
	}
}
