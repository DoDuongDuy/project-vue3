<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="store.state.doc.documents">
      <ListView :playlists="store.state.doc.documents" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a New Playlist</router-link>
  </div>
</template>

<script>
import ListView from '@/components/ListView.vue'
import { useStore } from 'vuex'
export default {
  components: { ListView },
  setup() {
    const store = useStore();
    store.commit('doc/getCollection', ['userId', '==', store.state.auth.user.uid])
    return {store  }
  }
}
</script>

<style scoped>
  h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  .btn {
    margin-top: 20px;
  }

  
</style>