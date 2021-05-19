<template>
  <div class="chat-window">
    <div v-if="$store.state.error">
      {{ $store.state.error }}
    </div>
    <!-- <p>{{}} </p>  -->
    <div class="messages" v-if="$store.state.documents">
      <div class="single" v-for="doc in $store.state.documents" :key="doc.id">
        <span class="create-at">
          {{ doc.createAt.toDate().toLocaleTimeString('en-US') }}  - {{ doc.createAt.toDate().toString() }}
        </span>
        <span class="name"> {{ doc.name }}: </span>
        <span class="message">
          {{ doc.message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    store.commit("getCollection");
  },
};
</script>

<style lang="scss">
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
  .messages {
    max-height: 400px;
    overflow: auto;
    .single {
      margin: 18px 0;
      .create-at {
        display: block;
        color: gray;
        font-size: 12px;
        margin-bottom: 4px;
      }
      .name {
        color: green;
        font-weight: bold;
        margin-right: 6px;
      }
      .message {
      }
    }
  }
}
</style>
