<template>
  <nav class="main-nav">
    <router-link to="/">Home</router-link>
    <router-link :to="{ name: 'AddProject' }"> New project</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style >
.main-nav {
  text-align: center;
  margin: 40px auto;
}
.main-nav a{
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
  color: black;
  font-size: 2rem;
}
a.router-link-active{
  border-bottom: 2px solid #00ce89;
  padding-bottom: 4px;
}
</style>
