<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input required type="text" placeholder="Playlist title" v-model="title" />
    <textarea required placeholder="Playlist description" v-model="description">
    </textarea>
    <label>Upload Playlist cover image</label>
    <input required type="file" @change="handleChange" />
    <div class="error">{{ fileeError }}</div>
    <div class="error"></div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "../../composables/useStorage.js";
import useCollection from "../../composables/useCollection.js";
import getUser from "../../composables/getUser.js";
import { timestamp } from '../../firebase/config.js';


export default {
  setup(props) {
    const { uploadImage, url, filePath } = useStorage();
    const { addDoc,isPending , error} = useCollection('playlists');
    const {user}  = getUser()

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileeError = ref(null);
    const handleSubmit = async () => {
      if (file.value) {
        // console.log(title.value, description.value, file.value);
        await uploadImage(file.value);
        await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName : user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs:[],
          createAt: timestamp()
        })
      }
      if(!error.value){
        console.log("playlists added");
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
    return { title, description, handleSubmit, handleChange, fileeError, isPending };
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