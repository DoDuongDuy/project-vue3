<template>
  <form @submit.prevent="handleSubmit">
    <h3 style="text-align: center">Sign up</h3>
    <input type="text" placeholder="displayName" v-model="displayName" />
    <input type="text" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useSignup from "../../composables/useSignup.js";
export default {
  setup(props) {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const { error, signup, isPending } = useSignup();
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if(!error.value){
          console.log("user signed up!!!");
      }
    };

    return { displayName, email, password, isPending, error, handleSubmit };
  },
};
</script>

<style>
</style>