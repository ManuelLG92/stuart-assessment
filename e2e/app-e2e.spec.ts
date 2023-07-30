import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { CreateCourierUseCase } from 'src/courier/application/use-cases/createCourierUseCase';
import { courierConstants } from 'src/courier/courier.constants';
import { CourierModule } from 'src/courier/courier.module';
import { CreateCourierController } from 'src/courier/infrastructure/controllers/rest/createCourierController';
import { CourierRepositoryImplementation } from 'src/courier/infrastructure/persistence/adapter/courierRepositoryImplementation';
import * as request from 'supertest';

describe('App (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	it('/health (GET)', () => {
		return request(app.getHttpServer())
			.get('/health')
			.expect(200)
			.expect({ status: 'OK' });
	});

	it('should get one seed record on lookup capacity', () => {
		return request(app.getHttpServer())
			.get('/couriers/lookup/capacity-required/50')
			.expect(200)
			.expect([{ id: 2, max_capacity: 50 }]);
	});

	it('should create a new courier', () => {
		return request(app.getHttpServer())
			.post('/couriers')
			.send({ id: 3, max_capacity: 1 })
			.expect(201)
			.expect({});
	});
});
