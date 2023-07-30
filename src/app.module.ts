import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from 'src/health/health.module';
import { RequestLoggerMiddleware } from 'src/middlewares/requestLoggerMiddleware';
import { CourierModule } from './courier/courier.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot(), CourierModule, HealthModule],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(RequestLoggerMiddleware).forRoutes('*');
	}
}
