<template>
  <form>
    <label> Title:</label>
    <input v-model="title" type="text" />
    <label> Details:</label>
    <textarea v-model="details"></textarea>
    <button @click.prevent="handleEdit(title, details,idedit)">Update project</button>
  </form>
</template>

<script>
export default {
  props: ["idedit"],
  data() {
    return {
      title: "",
      details: "",
      url: "http://localhost:3000/project/",
      project: null,
    };
  },
  mounted() {
    fetch(this.url + this.idedit)
      .then((res) => res.json())
      .then((data) => {
        this.title = data.title;
        this.details = data.details;
      })
      .catch((e) => console(e.message));
  },
  methods: {
      handleEdit(title, details, id){
          fetch(this.url + id,{
              method:"PUT",
              headers:{"Content-Type": "application/json"},
              body: JSON.stringify({title: title, details: details})
          })
          .then(()=>{
              this.$router.push('/')
          })
          .catch(e=> console.log(e.message))
      }
  },
};
</script>

<style>
form {
    margin: auto;
  background:#eee;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
}
label{
    display: block;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
}
input{
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
}
textarea{
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
}
form button {
    display: block;
    margin: 20px auto 0;
    background: green;
    color: white;
    padding: 10px;
    border: 0;
}
</style>
