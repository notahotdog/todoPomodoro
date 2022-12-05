import { getDatabase, ref, onValue, set } from "firebase/database";

export function storeHighScore(userId, score) {
  const db = getDatabase();
  const reference = ref(db, "users/" + userId);
  set(reference, {
    highscore: score,
  });
}
