<template>
  <div class="project" :class="{ complete_: project.complete }">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">
        <span class="material-icons">
          keyboard_arrow_down
        </span>
        {{ project.title }}
      </h3>
      <div class="icons">
        <span
          @click="completeProject(project.id, project.complete)"
          class="done material-icons"
        >
          done_all
        </span>
        <span @click="deleteProject(project.id)" class="material-icons">
          delete_forever
        </span>
        <router-link
          :to="{ name: 'EditProject', params: { idedit: project.id } }"
        >
          <span class="material-icons">
            create
          </span>
        </router-link>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["project"],
  data() {
    return {
      showDetails: false,
      url: "http://localhost:3000/project/",
    };
  },
  methods: {
    deleteProject(id) {
      fetch(this.url + id, { method: "DELETE" })
        .then(() => this.$emit("delete", id))
        .catch((e) => console.log(e.message));
    },
    completeProject(id, complete) {
      fetch(this.url + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !complete }),
      })
        .then(() => this.$emit("edit", id))
        .catch((e) => console.log(e.message));
    },
  },
};
</script>

<style>
.project {
  max-width: 600px;
  margin: 20px auto;
  background: #eee;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 10px solid red;
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.material-icons {
  color: #bbb;
  cursor: pointer;
  padding: 10px;
  border-radius: 7px;
}
.material-icons:hover {
  background: #777;
}
.project.complete_ {
  border-left: 10px solid green;
}
.project.complete_ .actions .icons .done {
  color: green;
}
</style>
