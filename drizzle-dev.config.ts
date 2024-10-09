import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	dialect: 'postgresql',
	schema: './src/schema.ts',
	dbCredentials: {
		url: 'postgresql://postgres:rootpassw0rd%23@localhost:5432/postgres'
	}
});
