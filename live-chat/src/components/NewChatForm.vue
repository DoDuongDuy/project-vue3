<template>
  <form>
    <textarea
      placeholder="enter chat here"
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    >
    </textarea>
    <div class="error">{{$store.state.error}} </div>
  </form>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { timestamp } from "../firebase/config.js";
import { useStore } from 'vuex';
export default {
  setup(props) {
    const message = ref("");
    const store = useStore();
    const handleSubmit = async () => {
      const chat = reactive({
        name: store.getters.getUser.displayName,
        email: store.getters.getUser.email,
        message: message.value,
        createAt: timestamp,
      }); 
      await store.dispatch('addDoc', chat);
      if (!store.state.error) {
        message.value = "";
      }
    };

    return { message, handleSubmit };
  },
};
</script>

<style lang="scss">
form {
  margin: 10px;
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }
}
</style>
