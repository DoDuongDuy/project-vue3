<template>
  <form @submit.prevent="handleSubmit()">
    <input type="email" required placeholder="email" v-model="$store.state.email" />
    <input type="password" required placeholder="password" v-model="$store.state.password" />
    <div class="error">{{ err }}</div>
    <button>Log In</button>
  </form>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
export default {
  setup(props, context) {
    const store = useStore();
    const err = computed(()=> store.state.error);
    const handleSubmit = async () => {
      await store.dispatch("login");
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
