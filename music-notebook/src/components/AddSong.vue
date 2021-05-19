
<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button>Add</button>
      <button @click="showForm = false">Back</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["playlist", "id"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const store = useStore();
    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000),
      };
      console.log(props.id);
      const res = await store.dispatch("doc/updateDoc", [
        { songs: [...props.playlist.songs, newSong] },
        { id: props.id },
      ]);
      title.value = "";
      artist.value = "";
    };
    return { title, artist, showForm, handleSubmit };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>