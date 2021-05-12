<template>
  <form @submit.prevent="handleSubmit">
    <h3 style="text-align: center">Login</h3>
    <input type="email" placeholder="email" v-model="store.state.email" />
    <input type="password" placeholder="password" v-model="store.state.password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!store.state.isPending">Login</button>
    <button v-if="store.state.isPending" disabled>Loading...</button>
    <!-- <button>Login</button> -->
  </form>
</template>

<script>
import { ref , computed} from "@vue/reactivity";
import { useStore } from 'vuex';
import useLogin from "../../composables/useLogin.js";
export default {
  // setup(props) {
  //   const { login, error, isPending } = useLogin();
  //   const email = ref("");
  //   const password = ref("");
  //   const handleSubmit = async () => {
  //     const res = await login(email.value, password.value);
  //     if (!error.value) {
  //       console.log(email.value, password.value);
  //       console.log("user loged in!!");
  //     }
  //   };
  //   return { email, password, handleSubmit, error, isPending };
  // },
  setup(props, context) {
    const store = useStore();
    const error = computed(()=> store.state.error);
    const handleSubmit = async () => {
      await store.dispatch("login");
      if(!store.state.error) {
        console.log("user logged in");
        // context.emit("login")
      }
    };

    return { handleSubmit , error, store};
  },
};
</script>

<style>
</style> 