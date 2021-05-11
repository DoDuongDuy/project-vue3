<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" placeholder="Playlist title" v-model="title" />
    <textarea placeholder="Playlist description" v-model="description">
    </textarea>
    <label>Upload Playlist cover image</label>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileeError }}</div>
    <div class="error"></div>
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup(props) {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileeError = ref(null);
    const handleSubmit = () => {
      if (file.value) {
        console.log(title.value, description.value, file.value);
      }
    };
    //allowed file types
    const tyoes = ["image/png", "image/jpeg"];
    const handleChange = (e) => {
      const selected = e.target.files[0];
      //   console.log(selected.type);
      if (selected && tyoes.includes(selected.type)) {
        file.value = selected;
        fileeError.value = null;
      } else {
        file.value = null;
        fileeError.value = "Please select an image file (png or jpg)";
      }
      console.log(file.value);
    };
    return { title, description, handleSubmit, handleChange, fileeError };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>