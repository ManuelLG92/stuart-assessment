import { Courier } from '../../../domain/courier';
import { CourierRepository } from '../../../application/port/courierRepository';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as seed from 'src/courier/infrastructure/persistence/adapter/couriers.json';

@Injectable()
export class CourierRepositoryImplementation
	implements CourierRepository, OnModuleInit
{
	private couriers: Record<number, Courier> = {};
	async upsert(courier: Courier): Promise<void> {
		this.couriers[courier.id] = courier;
		return Promise.resolve();
	}

	async findById(id: number): Promise<Courier> {
		const courier = this.couriers[id];
		if (!courier) {
			throw new NotFoundException(`Courier ${id} not found`);
		}
		return Promise.resolve(courier);
	}

	findByIdOrUndefined(id: number): Promise<Courier | undefined> {
		return Promise.resolve(this.couriers[id]);
	}

	async existsByIdOrThrow(id: number): Promise<void> {
		if (!this.couriers[id]) {
			throw new NotFoundException(`Courier ${id} not found`);
		}
	}

	async findByMaxCapacity(capacity: number): Promise<ReadonlyArray<Courier>> {
		const couriers = Object.values(this.couriers).filter(
			(courier) => courier.max_capacity >= capacity,
		);
		return Promise.resolve(couriers);
	}

	reset(): void {
		this.couriers = {};
	}

	async onModuleInit() {
		seed.forEach(({ id, max_capacity: capacity }) =>
			this.upsert(Courier.fromValues({ id, capacity })),
		);
	}
}
