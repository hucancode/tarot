import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "$lib/firebase/init";

const db = getFirestore(app);

let user = null;

const auth = getAuth(app);
onAuthStateChanged(auth, async (fireUser) => {
  if (fireUser) {
    const token = await fireUser.getIdTokenResult();
    user = token.claims;
  } else {
    user = null;
  }
});

export async function addDrawSession(cards, score, tries = 0) {
  if (user === null) {
    console.log("not logged in, skip");
    if (tries < 10) {
      setTimeout(() => addDrawSession(cards, score, tries + 1), 400);
    }
    return;
  }
  const data = {
    cards,
    score,
    user: user.email,
    time: Timestamp.fromDate(new Date()),
  };
  const ref = await addDoc(collection(db, "draws"), data);
  return ref;
}

export async function getDrawSessons() {
  if (user == null) {
    return [];
  }
  const ref = collection(db, "draws");
  const q = query(ref, where("user", "==", user.email));
  const snapshot = await getDocs(q);
  const ret = [];
  snapshot.forEach((e) => ret.push(e.data()));
  return ret;
}
