import { z } from 'zod';

export const createProblemDto = z.object({
	code: z.string(),
	title: z.string(),
	difficulty: z.coerce.number(),
	width: z.coerce.number(),
	height: z.coerce.number(),
	value: z.string().optional()
});
