import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCourierUseCase } from 'src/courier/application/use-cases/createCourierUseCase';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { courierConstants } from 'src/courier/courier.constants';
import { idAndMaxCapacityPayload } from 'test/courier/common/idAndMaxCapacity.payload';

describe('#CreateCourierUseCase', () => {
	let useCase: CreateCourierUseCase;
	let repository: CourierRepository;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: courierConstants.repository,
					useValue: createMock<CourierRepository>(),
				},
				CreateCourierUseCase,
			],
		}).compile();

		repository = app.get<CourierRepository>(courierConstants.repository);
		useCase = app.get<CreateCourierUseCase>(CreateCourierUseCase);
	});

	it('should create a courier', async () => {
		repository.findByIdOrUndefined = jest.fn().mockResolvedValue(undefined);
		expect(() =>
			useCase.execute(idAndMaxCapacityPayload({})),
		).not.toThrowError();
	});

	it('should throw an error if courier already exists', async () => {
		repository.findByIdOrUndefined = jest.fn().mockResolvedValue(true);
		const idAndMaxCapacity = idAndMaxCapacityPayload({});
		await expect(
			useCase.execute(idAndMaxCapacityPayload({})),
		).rejects.toThrowError(
			new BadRequestException(
				`Courier with id ${idAndMaxCapacity.id} already exists`,
			),
		);
	});
});
