<script>
  import { app } from "$lib/firebase/init";
  import { getDrawSessons } from "$lib/firebase/store";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  let data = null;

  const auth = getAuth(app);
  onAuthStateChanged(auth, async (fireUser) => {
    data = await getDrawSessons();
  });
</script>

<code>{JSON.stringify(data)}</code>
