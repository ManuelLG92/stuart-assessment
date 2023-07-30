import { Module } from '@nestjs/common';
import { GetCourierByIdUseCase } from 'src/courier/application/use-cases/getCourierByIdUseCase';
import { IncreaseCourierCapacityUseCase } from 'src/courier/application/use-cases/increaseCourierCapacityUseCase';
import { LookupCouriersUseCase } from 'src/courier/application/use-cases/lookupCouriersUseCase';
import { ResetCourierUseCase } from 'src/courier/application/use-cases/resetCourierUseCase';
import { UpdateCourierCapacityUseCase } from 'src/courier/application/use-cases/updateCourierCapacityUseCase';
import { courierConstants } from 'src/courier/courier.constants';
import { CreateCourierController } from 'src/courier/infrastructure/controllers/rest/createCourierController';
import { GetCourierByIdController } from 'src/courier/infrastructure/controllers/rest/getCourierByIdController';
import { IncreaseCourierCapacityController } from 'src/courier/infrastructure/controllers/rest/increaseCourierCapacityController';
import { LookupCouriersController } from 'src/courier/infrastructure/controllers/rest/lookupCouriersController';
import { ResetCourierCapacityController } from 'src/courier/infrastructure/controllers/rest/resetCourierCapacityController';
import { UpdateCourierCapacityController } from 'src/courier/infrastructure/controllers/rest/updateCourierCapacityController';
import { CourierRepositoryImplementation } from 'src/courier/infrastructure/persistence/adapter/courierRepositoryImplementation';
import { CreateCourierUseCase } from './application/use-cases/createCourierUseCase';

@Module({
	controllers: [
		CreateCourierController,
		LookupCouriersController,
		UpdateCourierCapacityController,
		ResetCourierCapacityController,
		IncreaseCourierCapacityController,
		GetCourierByIdController,
	],
	providers: [
		{
			provide: courierConstants.repository,
			useClass: CourierRepositoryImplementation,
		},
		CreateCourierUseCase,
		LookupCouriersUseCase,
		UpdateCourierCapacityUseCase,
		ResetCourierUseCase,
		IncreaseCourierCapacityUseCase,
		GetCourierByIdUseCase,
	],
})
export class CourierModule {}
