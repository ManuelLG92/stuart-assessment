import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class MaxCapacityCourierDto {
	@IsDefined()
	@IsNumber()
	@IsPositive()
	readonly max_capacity: number;
}
