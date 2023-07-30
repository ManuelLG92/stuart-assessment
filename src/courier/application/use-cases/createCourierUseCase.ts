import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { ParentUseCaseInterface } from 'src/courier/application/use-cases/contracts/parentUseCase.interface';
import { courierConstants } from 'src/courier/courier.constants';
import { Courier } from 'src/courier/domain/courier';
import { CommonCourierDto } from 'src/courier/infrastructure/controllers/rest/dto/commonCourier.dto';

@Injectable()
export class CreateCourierUseCase
	implements ParentUseCaseInterface<CommonCourierDto, void>
{
	constructor(
		@Inject(courierConstants.repository)
		private readonly courierRepository: CourierRepository,
	) {}
	async execute({ id, max_capacity: capacity }: CommonCourierDto) {
		if (await this.courierRepository.findByIdOrUndefined(id)) {
			throw new BadRequestException(
				`Courier with id ${id} already exists`,
			);
		}
		const courier = Courier.fromValues({ id, capacity });
		await this.courierRepository.upsert(courier);
	}
}
