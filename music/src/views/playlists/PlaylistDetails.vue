<template>
  <div class="error" v-if="state.user.error">
    {{ state.user.error }}
  </div>
  <div v-if="state.user.document" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="state.user.document.coverUrl" />
      </div>
      <h2>{{ state.user.document.title }}</h2>
      <p class="username">Created by {{ state.user.document.userName }}</p>
      <p class="description">{{ state.user.document.description }}</p>
    </div>

    <!-- song list -->
    <div class="song-list">
      <p>song list here</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    const { state } = useStore();
    store.commit("user/getDocument", {
      collection: state.user.collection,
      id: props.id,
    });
    return { state };
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