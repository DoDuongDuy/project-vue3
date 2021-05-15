<template>
  <form @submit.prevent="handleSubmit">
    <h3 style="text-align: center">Sign up</h3>
    <input type="text" placeholder="displayName" v-model="$store.state.displayName" />
    <input type="text" placeholder="email" v-model="$store.state.email" />
    <input
      type="password"
      placeholder="password"
      v-model="$store.state.password"
    />
    <div v-if="$store.state.error" class="error">{{ error }}</div>
    <button v-if="!$store.state.isPending">Sign up</button>
    <button v-if="$store.state.isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  // setup(props) {
  //   const displayName = ref("");
  //   const email = ref("");
  //   const password = ref("");
  //   const { error, signup, isPending } = useSignup();
  //   const handleSubmit = async () => {
  //     const res = await signup(email.value, password.value, displayName.value);
  //     if(!error.value){
  //         console.log("user signed up!!!");
  //     }
  //   };

  //   return { displayName, email, password, isPending, error, handleSubmit };
  // },
  setup(prop, context) {
    const store = useStore();
    const displayName = ref("");
    const handleSubmit = async () => {
      await store.dispatch("signup", {
        email: store.state.email,
        password: store.state.password,
        displayName: store.state.displayName,
      });
      if (!store.state.error) {
        alert('signup completed')
        context.emit("signup");
      }
    };

    return {  handleSubmit };
  },
};
</script>

<style>
</style>