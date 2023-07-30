export abstract class ParentUseCaseInterface<Input, Output> {
	abstract execute(input: Input): Promise<Output>;
}
