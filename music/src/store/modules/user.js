import { ref, watchEffect } from 'vue'
import { projectAuth, projectFirestore } from "../../firebase/config.js"

const user = {
    namespaced:true,
    state: {
      error: ref(null),
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
   actions:{}
  
  }
  export default user