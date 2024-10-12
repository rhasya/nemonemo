import { drizzle } from 'drizzle-orm/connect';
import { env } from '$env/dynamic/private';

export async function getDb() {
	return await drizzle('node-postgres', env.DATABASE_URL);
}
