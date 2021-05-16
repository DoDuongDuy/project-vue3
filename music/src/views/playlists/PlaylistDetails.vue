<template>
  <div class="error" v-if="state.doc.error">
    {{ state.doc.error }}
  </div>
  <div v-if="state.doc.document && tabIdx == 1" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="state.doc.document.coverUrl" />
      </div>
      <h2>{{ state.doc.document.title }}</h2>
      <p class="username">Created by {{ state.doc.document.userName }}</p>
      <p class="description">{{ state.doc.document.description }}</p>
      <button v-if="ownership" @click="tabIdx = 2">delete</button>
    </div>
    <!-- song list -->
    <div class="song-list">
      <div v-if="!state.doc.document.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <div
        v-for="song in state.doc.document.songs"
        :key="song.id"
        class="single-song"
      >
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership">delete</button>
      </div>
      <AddSong :playlist="state.doc.document" />
    </div>
  </div>
  <div v-if="tabIdx == 2">
    <label>are you sure?</label>
    <button @click="handleDelete">Yes</button>
    <button @click="tabIdx = 1">No</button>
  </div>
</template>

<script>
import AddSong from "../../components/AddSong.vue";
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: ["id"],
  components: { AddSong },
  setup(props) {
    const store = useStore();
    const { state } = useStore();
    const router = useRouter();
    const tabIdx = ref(1);
    store.commit("doc/getDocument", {
      collection: state.doc.collection,
      id: props.id,
    });
    const ownership = computed(() => {
      return (
        state.doc.document &&
        state.auth.user &&
        state.auth.user.uid == state.doc.document.userId
      );
    });
    const handleDelete = async () => {
      router.push({ name: "Home" });
      await store.dispatch("doc/deleteDoc", {
        collection: "playlists",
        id: props.id,
      });
      await store.dispatch("doc/deleteImg", state.doc.document.filePath);
    };
    return { state, ownership, handleDelete, tabIdx };
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
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
}
</style>