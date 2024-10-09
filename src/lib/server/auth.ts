import { SignJWT, jwtVerify } from 'jose';
import { env } from '$env/dynamic/private';

const key = new TextEncoder().encode(env.JWK_SECRET);

export async function createToken(user: { username: string }) {
	return await new SignJWT({ username: user.username })
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
	const { payload } = await jwtVerify<{ username: string }>(token, key);
	return { username: payload.username };
}
