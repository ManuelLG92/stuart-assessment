import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { CourierRepository } from 'src/courier/application/port/courierRepository';
import { GetCourierByIdUseCase } from 'src/courier/application/use-cases/getCourierByIdUseCase';
import { CourierResponseMapper } from 'src/courier/application/use-cases/mapper/courierResponseMapper';
import { courierConstants } from 'src/courier/courier.constants';
import { CourierStub } from 'test/courierStub';

describe('#GetCourierByIdUseCase', () => {
	let useCase: GetCourierByIdUseCase;
	let repository: CourierRepository;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: courierConstants.repository,
					useValue: createMock<CourierRepository>(),
				},
				GetCourierByIdUseCase,
			],
		}).compile();

		repository = app.get<CourierRepository>(courierConstants.repository);
		useCase = app.get<GetCourierByIdUseCase>(GetCourierByIdUseCase);
		repository.reset();
	});

	it('should return a courier', async () => {
		const expected = CourierStub.random();
		repository.findById = jest.fn().mockResolvedValue(expected);
		const response = await useCase.execute(expected.id);
		expect(response).toStrictEqual(
			CourierResponseMapper.fromEntity(expected),
		);
		expect(repository.findById).toHaveBeenCalledWith(expected.id);
	});
});
