import { createStore } from 'vuex'
import {ref} from 'vue'
import {projectAuth} from "../firebase/config.js"
import useSignup from '../composables/useSignup.js';
export default createStore({
  state: {
    email: ref(''),
    password: ref(''),
    error: ref(null),
    isPending:ref(false)
  },
  mutations: {
  },
  actions: {
    //login
    async login({state}){
      state.isPending = true;
      try {
        const res = await projectAuth.signInWithEmailAndPassword(state.email, state.password)
        state.error = null;
        state.isPending = false;
        return res
      }
      catch (err) {
        console.log(err.message);
        state.isPending = false;
        state.error = err.message;
      }
    },
    // signup
    async signup({state}, displayName){
      state.isPending= true;
      try {
        const res = await projectAuth.createUserWithEmailAndPassword(state.email, state.password)
        state.isPending = false;
        if (!res) {
          throw new Error('Could not complete signup')
        }
        await res.user.updateProfile({ displayName })
        state.error = null
    
        return res
      }
      catch (err) {
        state.isPending= false;
        console.log(err.message)
        state.error = err.message
      }
    }
  },
  
  modules: {
  }
})
