// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Problem {
		id: string;
		key: string;
		title: string;
		sizeVer: number;
		sizeHor: number;
		difficulty: number;
		all?: boolean;
	}
}

export {};
