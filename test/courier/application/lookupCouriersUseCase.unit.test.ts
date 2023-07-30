import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { LookupCouriersUseCase } from 'src/courier/application/use-cases/lookupCouriersUseCase';
import { CourierResponseMapper } from 'src/courier/application/use-cases/mapper/courierResponseMapper';
import { courierConstants } from 'src/courier/courier.constants';
import { CourierStub } from 'test/courierStub';

describe('#LookupCouriersUseCase', () => {
	let useCase: LookupCouriersUseCase;
	let repository: CourierRepository;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: courierConstants.repository,
					useValue: createMock<CourierRepository>(),
				},
				LookupCouriersUseCase,
			],
		}).compile();

		repository = app.get<CourierRepository>(courierConstants.repository);
		useCase = app.get<LookupCouriersUseCase>(LookupCouriersUseCase);
		repository.reset();
	});

	it('should return an empty array of couriers', async () => {
		repository.findByMaxCapacity = jest.fn().mockResolvedValue([]);
		const response = await useCase.execute(7);
		expect(response).toStrictEqual([]);
		expect(repository.findByMaxCapacity).toHaveBeenCalledWith(7);
	});

	it('should return an array of couriers', async () => {
		const capacity = 5;
		const input = CourierStub.randomRepeater(
			faker.number.int({ min: 1, max: 5 }),
		);
		repository.findByMaxCapacity = jest.fn().mockResolvedValue(input);
		const response = await useCase.execute(capacity);
		expect(response).toStrictEqual(
			CourierResponseMapper.fromEntities(input),
		);
		expect(repository.findByMaxCapacity).toHaveBeenCalledWith(capacity);
	});
});
