import { initializeApp } from 'firebase/app';
import { PUBLIC_FIREBASE_API_KEY } from '$env/static/public';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: 'boardgame-b6e98.firebaseapp.com',
	databaseURL: 'https://boardgame-b6e98.firebaseio.com',
	projectId: 'boardgame-b6e98',
	storageBucket: 'boardgame-b6e98.appspot.com',
	messagingSenderId: '820161298266',
	appId: '1:820161298266:web:87be9f9fed9e048ab9bd63'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
