<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="display name"
      v-model="displayName"
    />
    <input type="email" required placeholder="email" v-model="$store.state.email" />
    <input type="password" required placeholder="password" v-model="$store.state.password" />
    <div class="error">{{ $store.state.error }}</div>
    <button>Sign up</button>
  </form>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from "@vue/reactivity";
export default {
  setup(prop, context) {
    const store = useStore()
    const displayName = ref("");
    const handleSubmit = async () => {
      await store.dispatch('signup',displayName.value);
      if (!store.state.error) {
        context.emit("signup");
      }
    };

    return { displayName, handleSubmit };
  },
};
</script>

<style></style>
