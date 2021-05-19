<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl" alt="" />
        </div>
        <div class="info">
          <h3>{{ playlist.title }}</h3>
          <p>Create by {{ playlist.userName }}</p>
        </div>
        <div class="song-number">
          <p>{{ playlist.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import {useStore} from "vuex"
export default {
  props: ["playlists"],
  setup(props) {
    const store = useStore();
    console.log(props.playlists);
  },
};
</script>

<style lang='scss' scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
  &:hover {
    box-shadow: 2px 4px 6px rgba(41, 40, 40, 0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
    img {
      max-width: 100%;
      max-height: 100%;
      display: block;
    }
  }
  .info {
    margin: 0 30px;
  }
  .song-number {
    margin-left: auto;
  }
}
</style>