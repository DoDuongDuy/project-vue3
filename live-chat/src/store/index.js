import { ref } from "@vue/reactivity";
import { createStore } from "vuex";
import { projectAuth } from "../firebase/config";

export default createStore({
  state: {
    email : ref(''),
    password: ref(""),
    error: ref(null)
  },
  getters: {
  },
  mutations: {
  },
  actions: {
      // login
      async login({state}, form) {
        state.error = null;
      try {
        await projectAuth.signInWithEmailAndPassword(form.email, form.password);
        state.error= null;
      } catch (err) {
        console.log(err.message);
        state.error = err.message;
      }
    },

    // logout
    async logout({state}){
      state.error = null;
      try {
        await projectAuth.signOut();
      } catch (err) {
        console.log(err.message);
        state.error = err.message;
      }
    }
  },
  modules: {},
});
