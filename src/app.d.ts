// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: { id: number; username: string };
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Problem {
		id?: number;
		code?: string;
		title?: string;
		difficulty?: string;
		width?: number;
		height?: number;
	}
}

export {};
