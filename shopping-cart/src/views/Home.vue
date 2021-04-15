<template>
  <div class="home">
    <ProductDescriptionDrawer
      :product="product"
      :active="active.product_drawer"
      @closeProductDrawer="closeProductDrawer"
    >
    </ProductDescriptionDrawer>
    <div class="products-carts-container">
      <ProductSummaryCard
        v-for="product in items"
        :key="product.id"
        :product="product"
        @view-product="ViewProduct($event)"
      ></ProductSummaryCard>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import items from "../data/items.js";
import ProductSummaryCard from "../components/products/ProductSummaryCard.vue";
import ProductDescriptionDrawer from "../components/products/ProductDescriptionDrawer.vue";
export default {
  name: "Home",
  components: { ProductSummaryCard, ProductDescriptionDrawer },
  data() {
    return {
      items: items,
      product: null,
      active: {
        product_drawer: false,
      },
    };
  },
  methods: {
    ViewProduct(product) {
      this.product = product;
      this.active.product_drawer = true;
      // console.log(this.product);
    },
    closeProductDrawer() {
      this.active.product_drawer = false;
    },
  },
};
</script>
<style lang="scss">
.products-carts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
