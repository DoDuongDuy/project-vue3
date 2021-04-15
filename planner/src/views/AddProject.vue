<template>
  <form @submit.prevent="handleSubmit(title, details)">
    <label> Title:</label>
    <input v-model="title" type="text" />
    <label> Details:</label>
    <textarea v-model="details"></textarea>
    <button>Add project</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      details: "",
    };
  },
  methods: {
    handleSubmit(title, details) {
        let project ={
            title: title,
            details: details,
            complete:false
        }
        fetch("http://localhost:3000/project",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(project)
        })
        .then(()=> this.$router.push('/'))
    },
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
