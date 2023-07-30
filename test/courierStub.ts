import { faker } from '@faker-js/faker';
import { Courier } from 'src/courier/domain/courier';

export class CourierStub {
	static random(): Courier {
		return new Courier(
			faker.number.int({ min: 1, max: 100000 }),
			faker.number.int({ min: 1, max: 100 }),
		);
	}

	static fromValues(id: number, capacity: number): Courier {
		return new Courier(id, capacity);
	}

	static randomRepeater(count: number): Courier[] {
		return Array.from({ length: count }, () => this.random());
	}
}
