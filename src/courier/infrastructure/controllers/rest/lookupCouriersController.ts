import { Controller, Get, Param, Req, Request } from '@nestjs/common';
import { LookupCouriersUseCase } from 'src/courier/application/use-cases/lookupCouriersUseCase';
import { courierConstants } from 'src/courier/courier.constants';

@Controller(courierConstants.endpoints.base)
export class LookupCouriersController {
	constructor(private readonly useCase: LookupCouriersUseCase) {}

	@Get('lookup/capacity-required/:capacity')
	async findByMaxCapacity(
		@Req() request: Request,
		@Param('capacity') max_capacity: number,
	) {
		return this.useCase.execute(max_capacity);
	}
}
