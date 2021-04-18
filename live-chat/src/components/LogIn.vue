<template>
  <form @submit.prevent="handleSubmit()">
    <input type="email" required placeholder="email" v-model="$store.state.email" />
    <input type="password" required placeholder="password" v-model="$store.state.password" />
    <div class="error">{{ err }}</div>
    <button>Log In</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
export default {
  setup(props, context) {
    const store = useStore();
    const err = store.state.error;
    const handleSubmit = async () => {
      let form = {
        email: store.state.email,
        password : store.state.password
      } 
      await store.dispatch("login",form);
      if(!store.state.error) {
        console.log("user logged in");
        context.emit("login")
      }
    };

    return { handleSubmit , err};
  },
};
</script>

<style></style>
