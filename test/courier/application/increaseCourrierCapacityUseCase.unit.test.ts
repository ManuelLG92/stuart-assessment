import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { IncreaseCourierCapacityUseCase } from 'src/courier/application/use-cases/increaseCourierCapacityUseCase';
import { courierConstants } from 'src/courier/courier.constants';
import { CourierStub } from 'test/courierStub';

describe('#IncreaseCourierCapacityUseCase', () => {
	let useCase: IncreaseCourierCapacityUseCase;
	let repository: CourierRepository;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: courierConstants.repository,
					useValue: createMock<CourierRepository>(),
				},
				IncreaseCourierCapacityUseCase,
			],
		}).compile();

		repository = app.get<CourierRepository>(courierConstants.repository);
		useCase = app.get<IncreaseCourierCapacityUseCase>(
			IncreaseCourierCapacityUseCase,
		);
	});

	it('should increase a courier capacity', async () => {
		const courier = CourierStub.random();
		const capacityToAdd = faker.number.int({ min: 2, max: 8 });
		const expectedCapacity = courier.max_capacity + capacityToAdd;
		repository.findById = jest.fn().mockResolvedValue(courier);
		await useCase.execute({ id: courier.id, capacity: capacityToAdd });
		expect(courier.max_capacity).toEqual(expectedCapacity);
		expect(repository.findById).toHaveBeenCalledWith(courier.id);
		expect(repository.upsert).toHaveBeenCalledWith(courier);
	});
});
