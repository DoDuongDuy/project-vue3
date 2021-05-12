<template>
  <div class="home">
    <div v-if="error" class="error">{{ error }}</div>
    <div>
         <ListView :playlists="documents"/>
    </div>
  </div>
</template>

<script>
// challenge
//    - get realtime data from the playlists collection
//    - output 2 conditional items - error, or playlist titles
import getCollection from "../composables/getCollection";
import ListView from "../components/ListView.vue"
export default {
  name: "Home",
  components:{ListView},
  setup() {
    const { error, documents } = getCollection("playlists");
    return { error, documents };
  },
};
</script>