<script>
  import { app } from "$lib/firebase/init";
  import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as signOut_,
  } from "firebase/auth";

  let user = null;
  $: loggedIn = user !== null;
  const auth = getAuth(app);
  onAuthStateChanged(auth, async (fireUser) => {
    if (fireUser) {
      const token = await fireUser.getIdTokenResult();
      user = token.claims;
    } else {
      user = null;
    }
  });

  function signIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  function signOut() {
    signOut_(auth);
  }
</script>

{#if loggedIn}
  <p>Hello {user.name}</p>
  <button on:click={signOut}>Sign Out</button>
{:else}
  <button on:click={signIn}>Sign In</button>
{/if}
