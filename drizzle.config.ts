import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL;

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/schema.ts',
	dbCredentials: {
		url: url
	}
});
