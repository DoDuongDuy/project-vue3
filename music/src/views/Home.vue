<template>
  <div class="home">
    <div v-if="$store.state.error" class="error">{{ error }}</div>
    <div>
         <ListView :playlists="$store.state.documents"/>
    </div>
  </div>
</template>

<script>
import ListView from "../components/ListView.vue"
import {useStore} from "vuex"
export default {
  name: "Home",
  components:{ListView},
  setup(props) {
    const store = useStore();
    store.commit('getCollection', store.state.collection)
  }
};
</script>