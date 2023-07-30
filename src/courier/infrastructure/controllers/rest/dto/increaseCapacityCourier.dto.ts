import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class IncreaseCapacityCourierDto {
	@IsDefined()
	@IsNumber()
	@IsPositive()
	readonly capacity: number;
}
