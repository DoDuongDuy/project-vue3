<template>
  <div class="chat-window">
    <div v-if="error">
      {{ error }}
    </div>
    <div class="messages" v-if="documents">
      <div class="single" v-for="doc in documents" :key="doc.id">
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
import getCollection from "../composables/getCollection.js";
import {computed} from "vue"
import { format, formatDistanceToNow, formatRelative, subDays } from "date-fns";
export default {
  setup(props) {
    const { error, documents } = getCollection("messages");

    const formatDateDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createAt.toDate());
          return { ...doc, createAt: time };
        });
      }
    });
    return { error, documents, formatDateDocuments };
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
