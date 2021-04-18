import { ref } from "@vue/reactivity";
import { createStore } from "vuex";
import addDoc from "../composables/useCollection";
import { projectAuth ,projectFirestore  } from "../firebase/config";

export default createStore({
  state: {
    email: "",
    password: "",
    displayName: "",
    error: ref(null),
    user: [],
    collection:"messages"

  },
  getters: {
    getUser(state) {
      projectAuth.onAuthStateChanged((user_) => {
        state.user = user_;
      });
      return state.user;
    },
  },
  mutations: {},
  actions: {
    // login
    async login({ state }) {
      try {
        await projectAuth.signInWithEmailAndPassword(
          state.email,
          state.password
        );
        state.error = null;
      } catch (err) {
        console.log(err.message);
        state.error = err.message;
      }
    },
    //signup
    async signup({ state }, displayName) {
      try {
        const res = await projectAuth.createUserWithEmailAndPassword(
          state.email,
          state.password
        );
        if (!res) {
          throw new Error("could not complete th signup");
        }
        await res.user.updateProfile({ displayName });
        state.error = null;
        console.log(res.user);

        return res;
      } catch (err) {
        console.log(err.message);
        state.error = err.message;
      }
    },

    // logout
    async logout({ state }) {
      state.error = null;
      try {
        await projectAuth.signOut();
      } catch (err) {
        console.log(err.message);
        state.error = err.message;
      }
    },

    //useCollection
    async addDoc({state},doc) {
      state.error = null;
      try {
        await projectFirestore.collection(state.collection).add(doc);
      } catch (err) {
        console.log(err.message);
        state.error = "could not send the message!!"
      }
    },
  },
  modules: {},
});
