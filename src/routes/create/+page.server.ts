export const actions = {
	default: async function ({ request }) {
		const formData = await request.formData();

		// validate
		if (!formData.get('code')) {
		}
	}
};
