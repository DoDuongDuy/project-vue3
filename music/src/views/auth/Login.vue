<template>
  <form @submit.prevent="handleSubmit">
    <h3 style="text-align: center">Login</h3>
    <input type="email" placeholder="email" v-model="$store.state.auth.email" />
    <input
      type="password"
      placeholder="password"
      v-model="store.state.auth.password"
    />
    <div v-if="$store.state.auth.error" class="error">{{ $store.state.auth.error }}</div>
    <button v-if="!$store.state.auth.isPending">Login</button>
    <button v-if="$store.state.auth.isPending" disabled>Loading...</button>
    <!-- <button>Login</button> -->
  </form>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    console.log(store);
    // const error = computed(() => store.state.auth.error);
    const handleSubmit = async () => {
      await store.dispatch("auth/login");
      if (!store.state.auth.error) {
        context.emit("login")
        router.push({ name: "UserPlaylists" });
      }
    };
    return { handleSubmit, store };
  },
};
</script>

<style>
</style> 