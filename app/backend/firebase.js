import { getDatabase, ref, onValue, set } from "firebase/database";

export function storeHighScore(userId, score) {
  const db = getDatabase();
  const reference = ref(db, "users/" + userId);
  set(reference, {
    highscore: score,
  });
}

export function updateState(userID, state) {
  const db = getDatabase();
  const reference = ref(db, "users/" + userID);
  set(reference, {
    task: state,
  });
}
