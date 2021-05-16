import { ref, watchEffect } from 'vue'
import { projectAuth, projectFirestore ,projectStorage} from "../../firebase/config.js"

const doc = {
  namespaced: true,
  state: {
    error: ref(null),

    //getCollection
    documents: ref(null),
    document: ref(null),
    collection: ref('playlists')
    //create playlists
  },
  getters: {
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
      return state.document
    }
  },
  actions: {
    //delete document 
    async deleteDoc(state,{collection, id}) {
      let docRef = projectFirestore.collection(collection).doc(id)
      state.isPending = true
      state.error = null

      try {
        const res = await docRef.delete()
        state.isPending= false
        return res
      }
      catch (err) {
        console.log(err.message)
        state.isPending = false
        state.error = 'could not delete the document'
      }
    },
    //delete image
    async deleteImg(state, path){
      state.error = null;
      const storageRef = projectStorage.ref(path);
      try {
        await storageRef.delete()
      } catch (err) {
        console.log(err.message)
        state.error = err.message
      }
    }
  }

}
export default doc