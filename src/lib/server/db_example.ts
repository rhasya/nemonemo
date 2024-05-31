import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: FILL CONFIG AND CHANGE FILENAME TO "db.ts"

const firebaseConfig = {
	apiKey: '-',
	authDomain: '-',
	databaseURL: '-',
	projectId: '-',
	storageBucket: '-',
	messagingSenderId: '-',
	appId: '-'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
// export const db = getFirestore(app);
