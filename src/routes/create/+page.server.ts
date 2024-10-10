import { createProblemDto } from '$lib/server/dto/problemDto.js';
import { createProblem } from '$lib/server/service/problem';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async function ({ request }) {
		const formData = await request.formData();

		// validate
		const input = Object.fromEntries(formData);
		const { success, data, error } = createProblemDto.safeParse(input);
		if (!success) {
			console.error(error.errors);
			return { error: error.errors[0].message };
		}

		await createProblem(data);
		redirect(303, '/');
	}
};
