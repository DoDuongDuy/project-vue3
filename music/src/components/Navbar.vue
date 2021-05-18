<template>
  <div class="navbar">
    <nav>
      <h1>
        <div class="logo">
          <router-link :to="{ name: 'Home' }"
            ><img src="../assets/logo.jpg" alt="logo"
          /></router-link>
          <router-link :to="{ name: 'Home' }">Music</router-link>
        </div>
      </h1>
      <div class="links">
        <div v-if="$store.state.auth.user">
          <router-link :to="{ name: 'CreatePlaylist' }">
            <button>Create Playlist</button></router-link
          >
          <router-link :to="{ name: 'UserPlaylists' }">
            <button>MY Playlistst</button></router-link
          >
          <button @click="handleClick">logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">
            Sign up</router-link
          >
          <router-link class="btn" :to="{ name: 'Login' }"> Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    const store = useStore();
    const router = useRouter();
    store.getters["auth/getUser"];
    const handleClick = async () => {
      await store.dispatch("auth/logout");
      console.log("user loged out!!");
      router.push({ name: "Login" });
    };
    return { handleClick };
  },
};
</script>

<style lang="scss" scope>
.navbar {
  border-bottom: 1px solid green;
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    h1 {
      margin-left: 20px;
      .logo {
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
          max-height: 60px;
        }
      }
    }
    .links {
      margin-left: auto;
      a {
        margin-left: 16px;
        font-size: 14px;
      }
    }
    button {
      margin-left: 16px;
      font-size: 14px;
    }
  }
}
</style>