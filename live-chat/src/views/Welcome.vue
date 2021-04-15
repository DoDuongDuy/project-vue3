<template>
  <div class="welcome container">
    <p>welcome</p>
    <div v-if="showLogin">
      <h2>Login</h2>
      <LogIn @login="enterChat"></LogIn>
      <p>
        no account yet? <span @click="showLogin = false">Signup</span> instead
      </p>
    </div>
    <div v-else>
      <h2>Signup</h2>
      <SignUp @signup="enterChat"></SignUp>
      <p>
        Aready registered? <span @click="showLogin = true">Login</span> instead
      </p>
    </div>
  </div>
</template>

<script>
import SignUp from "../components/SignUp.vue";
import LogIn from "../components/LogIn.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  components: { SignUp, LogIn },
  setup() {
    const router = useRouter();
    const showLogin = ref(true);
    const enterChat = () => {
      router.push({ name: "Chatroom" });
    };
    return { showLogin, enterChat };
  },
};
</script>

<style lang="scss">
.welcome {
  text-align: center;
  padding: 20px 0;
  form {
    width: 300px;
    margin: 20px auto;
  }
  label {
    display: block;
    margin: 20px 0 10px;
  }
  input {
    /* display: block; */
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid gray;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  span {
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
    color: green;
  }
  button {
    margin: 20px auto;
  }
}
</style>
