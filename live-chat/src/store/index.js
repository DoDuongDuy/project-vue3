import { ref } from "@vue/reactivity";
import { createStore } from "vuex";
import { projectAuth, projectFirestore } from "../firebase/config";

export default createStore({
  state: {
    email: "",
    password: "",
    displayName: "",
    error: ref(null),
    user: [],
    collection: "messages",
    documents: ref(null),
  },
  getters: {
    getUser(state) {
      projectAuth.onAuthStateChanged((user_) => {
        state.user = user_;
      });
      return state.user;
    },
  },
  mutations: {
    //get Collection
    getCollection(state) {
      state.documents = null;
      let collectionref = projectFirestore
        .collection(state.collection)
        .orderBy("createAt");
      collectionref.onSnapshot(
        (snap) => {
          let results = [];
          snap.docs.forEach((doc) => {
            doc.data().createAt && results.push({ ...doc.data(), id: doc.id });
          });
          state.documents = results;
          state.error = null;
        },
        (err) => {
          console.log(err.message);
          state.documents = null;
          state.error = "could not fetch the data";
        }
      );
      return state.documents;
    },
  },
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
    async addDoc({ state }, doc) {
      state.error = null;
      try {
        await projectFirestore.collection(state.collection).add(doc);
      } catch (err) {
        console.log(err.message);
        state.error = "could not send the message!!";
      }
    },
  },
  modules: {},
});
