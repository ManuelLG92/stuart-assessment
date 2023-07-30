import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { UpdateCourierCapacityUseCase } from 'src/courier/application/use-cases/updateCourierCapacityUseCase';
import { courierConstants } from 'src/courier/courier.constants';
import { Courier } from 'src/courier/domain/courier';
import { idAndMaxCapacityPayload } from 'test/courier/common/idAndMaxCapacity.payload';
import { CourierStub } from 'test/courierStub';

describe('#UpdateCourierUseCase', () => {
	let useCase: UpdateCourierCapacityUseCase;
	let repository: CourierRepository;
	let courier: Courier;
	const defaultCourierId = 1;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: courierConstants.repository,
					useValue: createMock<CourierRepository>(),
				},
				UpdateCourierCapacityUseCase,
			],
		}).compile();

		repository = app.get<CourierRepository>(courierConstants.repository);
		useCase = app.get<UpdateCourierCapacityUseCase>(
			UpdateCourierCapacityUseCase,
		);
		courier = CourierStub.fromValues(defaultCourierId, defaultCourierId);
	});
	it('should update the capacity', async () => {
		const idAndMaxCapacity = idAndMaxCapacityPayload({});
		repository.findById = jest.fn().mockResolvedValue(courier);
		await useCase.execute(idAndMaxCapacity);
		expect(courier.max_capacity).toEqual(idAndMaxCapacity.max_capacity);
		expect(repository.findById).toHaveBeenCalledWith(courier.id);
		expect(repository.upsert).toHaveBeenCalledWith(courier);
	});
});
