import { ScheduleApiV2 } from '../src/api/scheduleApiV2';
import { Task } from '../src/datatypes/datatypes';

describe('Schdule of unconstrained tasks', () => {
	it('rejects when task duration exceeds to maximum possible duration', async () => {
		// Arrange.
		const task: Task = {
			id: 'Some uuid',
			name: 'Wash',
			duration: 100000000,
			power: 10000,
			energy: 10000,
		};

		try {
			// Act.
			await ScheduleApiV2.schedule([task]);

			// Assert
			fail();
		} catch {}
	});
});
