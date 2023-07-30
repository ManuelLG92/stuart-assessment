export const idAndMaxCapacityPayload = ({
	id = 1,
	max_capacity = 100,
}: {
	id?: number;
	max_capacity?: number;
}) => {
	return { id, max_capacity };
};
