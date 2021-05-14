import { createStore } from 'vuex'
import { ref, watchEffect } from 'vue'
import { projectAuth,projectFirestore } from "../firebase/config.js"
import useSignup from '../composables/useSignup.js';
export default createStore({
  state: {
    //login-signup
    email: ref(''),
    password: ref(''),
    error: ref(null),
    isPending: ref(false),
    //getCollection
    document: ref(null),
    collection: ref(null)
  },
  mutations: {
    getDocument(state,id) {
      let documentRef = projectFirestore.collection(state.collection).doc(id)
      console.log("run");
      const unsub = documentRef.onSnapshot(doc => {
        // need to make sure the doc exists & has data
        if (doc.data()) {
          state.document = { ...doc.data(), id: doc.id }
          state.error = null
        }
        else {
          state.error = 'that document does not exist'
        }
      }, err => {
        console.log(err.message)
        state.error = 'problem fetching the document'
      })

      watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
      });
      console.log(id);
      return state.document
    }
  },
  actions: {
    //login
    async login({ state }) {
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
    async signup({ state }, displayName) {
      state.isPending = true;
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
        state.isPending = false;
        console.log(err.message)
        state.error = err.message
      }
    }
  },

  modules: {
  }
})
