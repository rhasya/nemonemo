import { addDoc, collection } from 'firebase/firestore';
import { db } from './fb';

async function saveProblem(problem: Problem) {
	problem.all = false;
	await addDoc(collection(db, 'nemonemo'), problem);
}

export default {
	saveProblem
};
