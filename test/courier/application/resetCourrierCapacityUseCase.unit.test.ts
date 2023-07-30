import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { IncreaseCourierCapacityUseCase } from 'src/courier/application/use-cases/increaseCourierCapacityUseCase';
import { ResetCourierUseCase } from 'src/courier/application/use-cases/resetCourierUseCase';
import { courierConstants } from 'src/courier/courier.constants';
import { CourierStub } from 'test/courierStub';

describe('#ResetCourierUseCase', () => {
	let useCase: ResetCourierUseCase;
	let repository: CourierRepository;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: courierConstants.repository,
					useValue: createMock<CourierRepository>(),
				},
				ResetCourierUseCase,
			],
		}).compile();

		repository = app.get<CourierRepository>(courierConstants.repository);
		useCase = app.get<ResetCourierUseCase>(ResetCourierUseCase);
	});

	it('should increase a courier capacity', async () => {
		const courier = CourierStub.random();
		repository.findById = jest.fn().mockResolvedValue(courier);
		await useCase.execute(courier.id);
		expect(courier.max_capacity).toEqual(0);
		expect(repository.findById).toHaveBeenCalledWith(courier.id);
		expect(repository.upsert).toHaveBeenCalledWith(courier);
	});
});
