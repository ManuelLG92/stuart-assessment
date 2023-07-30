import { Courier } from 'src/courier/domain/courier';

export interface CourierResponseDto {
	id: number;
	max_capacity: number;
}
export abstract class CourierResponseMapper {
	static fromEntity(entity: Courier): CourierResponseDto {
		return {
			id: entity.id,
			max_capacity: entity.max_capacity,
		};
	}

	static fromEntities(
		entities: ReadonlyArray<Courier>,
	): ReadonlyArray<CourierResponseDto> {
		return entities.map((entity) => this.fromEntity(entity));
	}
}
