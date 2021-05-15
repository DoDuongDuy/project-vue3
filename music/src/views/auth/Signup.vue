<template>
  <form @submit.prevent="handleSubmit">
    <h3 style="text-align: center">Sign up</h3>
    <input
      type="text"
      required
      placeholder="displayName"
      v-model="state.auth.displayName"
    />
    <input
      type="text"
      required
      placeholder="email"
      v-model="state.auth.email"
    />
    <input
      required
      type="password"
      placeholder="password"
      v-model="state.auth.password"
    />
    <div v-if="state.auth.error" class="error">
      {{ state.auth.error }}
    </div>
    <button v-if="!state.auth.isPending">Sign up</button>
    <button v-if="state.auth.isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup(prop, context) {
    const router = useRouter();
    const store = useStore();
    const { state } = useStore();
    const handleSubmit = async () => {
      await store.dispatch("auth/signup", state.auth.displayName);
      if (!state.auth.error) {
        alert("signup completed");
        router.push({ name: "Login" });
        context.emit("signup");
      }
    };

    return { handleSubmit, state };
  },
};
</script>

<style>
</style>