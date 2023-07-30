import { Courier } from '../../domain/courier';

export interface CourierRepository {
	upsert(user: Courier): Promise<void>;
	findByMaxCapacity(capacity: number): Promise<ReadonlyArray<Courier>>;
	findById(id: number): Promise<Courier>;
	findByIdOrUndefined(id: number): Promise<Courier | undefined>;
	existsByIdOrThrow(id: number): Promise<void>;
	reset(): void;
}
