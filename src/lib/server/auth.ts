import { SignJWT, jwtVerify } from 'jose';
import { env } from '$env/dynamic/private';

const key = new TextEncoder().encode(env.JWK_SECRET);

interface User {
	id: number;
	username: string;
}

export async function createToken({ id, username }: User) {
	return await new SignJWT({ id, username })
		.setProtectedHeader({
			alg: 'HS256',
			typ: 'JWT'
		})
		.setSubject('auth')
		.setExpirationTime('1h')
		.setIssuedAt(new Date().getTime())
		.sign(key);
}

export async function verifyToken(token: string) {
	try {
		const { payload } = await jwtVerify<User>(token, key);
		return { ...payload };
	} catch (e) {
		console.error(e);
		return null;
	}
}
