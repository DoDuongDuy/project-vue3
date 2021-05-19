<template>
  <div style="line"><Navbar></Navbar></div>
  <div class="content">
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>
<style lang="scss">
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
.line{
  border-bottom: 2px solid black;
}
</style>
