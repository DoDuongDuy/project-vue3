<template>
  <div class="error" v-if="store.state.error">{{ store.state.error }}</div>
  <div v-if="store.state.document" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="store.state.document.coverUrl" />
      </div>
      <h2>{{ store.state.document.title }}</h2>
      <p class="username">Created by {{ store.state.document.userName }}</p>
      <p class="description">{{ store.state.document.description }}</p>
    </div>

    <!-- song list -->
    <div class="song-list">
      <p>song list here</p>
    </div>
  </div>
</template>

<script>
import {mapState, useStore} from 'vuex'
import {computed} from 'vue'
export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    store.state.collection = 'playlists'
    const run = store.commit('getDocument',props.id)
    return {store}
  },
};
</script>

<style lang="scss" scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  .playlist-info {
    text-align: center;
    h2 {
      text-transform: capitalize;
      font-size: 28px;
      margin-top: 20px;
    }
    p {
      margin-bottom: 20px;
    }
    .cover {
      overflow: hidden;
      border-radius: 20px;
      position: relative;
      padding: 160px;
      img {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        max-width: 200%;
        max-height: 200%;
      }
    }
    .username {
      color: #999;
    }
    .description {
      text-align: left;
    }
  }
}
</style>