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
// import items from "../data/items.js";
import ProductSummaryCard from "../components/products/ProductSummaryCard.vue";
import ProductDescriptionDrawer from "../components/products/ProductDescriptionDrawer.vue";
import { useStore } from "vuex";
import { reactive, ref } from "@vue/reactivity";
export default {
  name: "Home",
  components: { ProductSummaryCard, ProductDescriptionDrawer },
  setup() {
    const store = useStore();
    const items = store.state.items;
    const product = ref(null);
    const active = reactive({ product_drawer: false });
    const ViewProduct = (item) => {
      product.value = item;
      active.product_drawer = true;
    };
    const closeProductDrawer = () => {
      active.product_drawer = false;
    };
    return { items, product, active, ViewProduct, closeProductDrawer };
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
