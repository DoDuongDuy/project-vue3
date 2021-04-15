<template>
  <nav>
    <button @Click="updateFilter('all')" :class="{ active: current == 'all' }">
      All
    </button>
    <button @Click="updateFilter('going')" :class="{ active: current == 'going' }">
      On going
    </button>
    <button
      @Click="updateFilter('complete')"
      :class="{ active: current == 'complete' }"
    >
      Complete
    </button>
  </nav>
</template>

<script>
export default {
  props: ["current"],
  data() {
    return {
      cur: "",
    };
  },
  methods: {
    updateFilter(by) {
      this.$emit("filter", by);
    },
  },
};
</script>

<style>
nav {
  text-align: center;
  margin: 0;
}
button {
  margin-left: 20px;
  width: 100px;
  border: none;
  background: white;
  padding: 5px;
  /* border-bottom: 2px solid black; */
  font-size: 1.2rem;
  outline: none;
}
button:hover {
  background: blanchedalmond;
  border-radius: 5px;
}
 button.active{
    border-bottom: 2px solid green;
    /* border: none; */
}
</style>
