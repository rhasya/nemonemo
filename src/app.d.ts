// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Game {
		height: number;
		width: number;
		state: number[][];
		horProbSize?: number;
		horProb?: number[][];
		verProbSize?: number;
		verProb?: number[][];
	}
}

export {};
