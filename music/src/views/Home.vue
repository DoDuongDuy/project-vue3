<template>
  <div class="home">
    <div v-if="$store.state.auth.error" class="error">{{ $store.state.auth.error }}</div>
    <div>
         <ListView :playlists="$store.state.doc.documents"/>
    </div>
  </div>
</template>

<script>
import ListView from "../components/ListView.vue"
import {useStore} from "vuex"
import { watchEffect} from 'vue'
export default {
  name: "Home",
  components:{ListView},
  setup(props) {
    const store = useStore();
    watchEffect(()=>{
      store.commit('doc/getCollection', store.state.doc.collection)
    })
    // console.log(store.state.doc.documents);

  }
};
</script>