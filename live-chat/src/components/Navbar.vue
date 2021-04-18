<template>
  <nav v-if="user">
    <div>
      <p>Hey there is...{{ user.displayName }}</p>
      <p class="email">Currently logged in as...{{ user.email }}</p>
    </div>
    <button @click="handleLogout">Logout</button>
    <!-- <p>{{ user1.email }} </p> -->
  </nav>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useRouter } from "vue-router";
// import useLogout from "../composables/useLogout.js";
// import getUser from "../composables/getUser.js";
import { useStore } from 'vuex';
export default {
  setup(props) {
    const store = useStore();
    let user = computed(()=>store.getters.getUser);
    // const { user } = getUser();
    const router = useRouter();
    const handleLogout = async () => {
      await store.dispatch('logout');
      if (!store.state.error) {
        console.log("logged out!!!");
        router.push({ name: "Welcome" }); 
      }
    };
    return { user, handleLogout };
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid gray;
  div {
    p {
      margin: 2px;
      font-size: 16px;
      color: black;
      &.email {
        font-size: 14px;
        color: gray;
      }
    }
  }
}
</style>
