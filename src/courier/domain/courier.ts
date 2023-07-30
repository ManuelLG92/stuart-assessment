export class Courier {
	readonly id: number;
	private _max_capacity: number;
	constructor(id: number, max_capacity: number) {
		this.id = id;
		this._max_capacity = max_capacity;
	}

	static fromValues({
		id,
		capacity,
	}: {
		id: number;
		capacity: number;
	}): Courier {
		return new Courier(id, capacity);
	}
	get max_capacity(): number {
		return this._max_capacity;
	}
	setCapacity(capacity: number): void {
		this._max_capacity = capacity;
	}

	addCapacity(capacity: number): void {
		this._max_capacity += capacity;
	}
	resetCapacity(): void {
		this._max_capacity = 0;
	}
}
