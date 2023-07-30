import { IsDefined, IsPositive } from 'class-validator';
import { MaxCapacityCourierDto } from 'src/courier/infrastructure/controllers/rest/dto/maxCapacityCourier.dto';

export class CommonCourierDto extends MaxCapacityCourierDto {
	@IsDefined()
	@IsPositive()
	readonly id: number;
}
