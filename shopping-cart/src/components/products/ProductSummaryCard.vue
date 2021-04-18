<template>
  <div class="card">
    <h3>{{ product.name }}</h3>
    <h5 class="price">Price: {{ product.price }} $</h5>
    <p class="description">Description: {{description}} </p>
    <p class="text-mute">{{ product.category }}</p>
    <button class="view-product-button" @click="$emit('view-product', product)">
      View
    </button>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: ["product"],
    setup(props) {
        const description = computed(()=> props.product.description.substring(0,50) ); 
      return {description}
    },
};
</script>

<style lang="scss">
.card {
  width: 80%;
  margin: 10%;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 5px gray;
  h5.price {
    color: gray;
  }
  p.description {
    font-size: 0.85rem;
  }
  p.text-muted {
    color: gray;
  }
}
button.view-product-button {
  padding: 10px;
  background-color: green;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.15rem;
  border-radius: 5px;
  cursor: pointer;
}
@media (min-width: 500px) {
  .card {
    width: 350px;
    margin: 10px;
  }
}
</style>
