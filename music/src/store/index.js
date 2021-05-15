import { createStore } from 'vuex'
import { ref, watchEffect } from 'vue'
import { projectAuth, projectFirestore } from "../firebase/config.js"
export default createStore({
  state: {
    //login-signup
    displayName: ref(null),
    email: ref(null),
    password: ref(null),
    error: ref(null),
    isPending: ref(false),
    //user
    user: ref(projectAuth.currentUser),
    //getCollection
    documents: ref(null),
    document: ref(null),
    collection: ref('playlists')
    //create playlists
  },
  getters: {
    //getUser
    getUser(state) {
      projectAuth.onAuthStateChanged(_user => {
        state.user = _user
        // console.log(user.value);
      });
    }
  },
  mutations: {
    //get Collection
    getCollection(state, collection) {
      let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')

      const unsub = collectionRef.onSnapshot(snap => {
        let results = []
        snap.docs.forEach(doc => {
          // must wait for the server to create the timestamp & send it back
          doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        });
        // update values
        state.documents = results
        state.error = null
      }, err => {
        console.log(err.message)
        state.documents = null
        state.error = 'could not fetch the data'
      })

      watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
      });
    },
    //get documents 
    getDocument(state, { collection, id }) {
      let documentRef = projectFirestore.collection(collection).doc(id)
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
    async login(state, { email, password }) {
      state.isPending = true;
      try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
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
    async signup(state, { email, password, displayName }) {
      state.isPending = true;
      try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
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
    },
    // logout
    async logout() {
      try {
        await projectAuth.signOut()
      }
      catch (err) {
        console.log(err.message)
        state.error = err.message
      }
    }
  },

  modules: {
  }
})
