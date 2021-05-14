<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
    </div>

    <!-- song list -->
    <div class="song-list">
      <p>song list here</p>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
export default {
  props: ["id"],
  setup(props) {
    const { error, document: playlist } = getDocument("playlists", props.id);
    return { error, playlist };
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