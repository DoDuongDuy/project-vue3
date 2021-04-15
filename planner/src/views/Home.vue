<template>
  <div class="home">
    <FilterNav @filter="current = $event" :current="current"></FilterNav>
    <div v-if="projects.length">
      <div v-for="prj in filterProject" :key="prj.id">
        <SingleProject
          :project="prj"
          @delete="deleteProject($event)"
          @edit="toggleComplete($event)"
        ></SingleProject>
      </div>
    </div>
  </div>
</template>

<script>
import SingleProject from "../components/SingleProject.vue";
import FilterNav from "../components/FilterNav.vue";
// @ is an alias to /src
export default {
  name: "Home",
  components: { SingleProject, FilterNav },
  data() {
    return {
      projects: [],
      current: 'all',
    };
  },
  computed:{
    filterProject(){
      if(this.current == "going"){
        return this.projects.filter(project=> !project.complete)
      }else if(this.current == "complete" ){
        return this.projects.filter(project => project.complete)
      }else{
        return this.projects
      }
    }
  },
  mounted() {
    fetch("http://localhost:3000/project")
      .then((res) => res.json())
      .then((data) => (this.projects = data))
      .catch((e) => console(e.message));
  },
  methods: {
    deleteProject(id) {
      this.projects = this.projects.filter((project) => {
        return project.id !== id;
      });
    },
    toggleComplete(id) {
      let p = this.projects.find((project) => {
        return project.id === id;
      });
      p.complete = !p.complete;
    },
  },
};
</script>
