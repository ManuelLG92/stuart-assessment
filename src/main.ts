import { NestFactory } from '@nestjs/core';
import { ErrorHandler } from 'src/error-handler/errorHandler';
import { RequestInterceptor } from 'src/interceptors/requestInterceptor';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('PORT') || 3000;

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	app.useGlobalInterceptors(new RequestInterceptor());
	app.useGlobalFilters(new ErrorHandler());
	await app.listen(port);
	Logger.log(`App listening on port ${port}`);
}
bootstrap().catch((err) => {
	Logger.error(`Failed to start server: ${err.message}`, err.stack);
	process.exit(1);
});
