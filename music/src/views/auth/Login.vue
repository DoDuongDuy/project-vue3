<template>
  <form @submit.prevent="handleSubmit">
    <h3 style="text-align: center">Login</h3>
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useLogin from "../../composables/useLogin.js";
export default {
  setup(props) {
    const { login, error, isPending } = useLogin();
    const email = ref("");
    const password = ref("");
    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log(email.value, password.value);
        console.log("user loged in!!");
      }
    };
    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style>
</style> 