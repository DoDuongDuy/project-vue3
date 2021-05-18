import { ref, watchEffect } from 'vue'
import { projectFirestore, projectStorage } from "../../firebase/config.js"

const doc = {
  namespaced: true,
  state: {
    error: ref(null),

    //getCollection
    documents: ref(null),
    document: ref(null),
    collection: ref('playlists'),
    //create playlists
  },
  getters: {
  },
  mutations: {
    //get Collection
    getCollection(state, query ) {
      let collectionRef = projectFirestore.collection(state.collection)
        .orderBy('createdAt')
      if (query) {
        console.log(query);
        collectionRef = collectionRef.where(...query)
      }
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
      return state.documents
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
    //add docmument
    async addDoc(){
      // try {
      //   const res =  await projectFirestore.collection(collection).add(doc)
      //   isPending.value = false;
      //   return res
      // }
      // catch (err) {
      //   console.log(err.message);
      //   isPending.value = false;
      //   error.value = 'could not send the message';
      // }
    }, 
    //delete document 
    async deleteDoc(state, { collection, id }) {
      let docRef = projectFirestore.collection(collection).doc(id)
      state.isPending = true
      state.error = null

      try {
        const res = await docRef.delete()
        state.isPending = false
        return res
      }
      catch (err) {
        console.log(err.message)
        state.isPending = false
        state.error = 'could not delete the document'
      }
    },
    //delete image
    async deleteImg(state, path) {
      state.error = null;
      const storageRef = projectStorage.ref(path);
      try {
        await storageRef.delete()
      } catch (err) {
        console.log(err.message)
        state.error = err.message
      }
    },
    //update documents
    async updateDoc(state, updates) {
      state.error = null
      console.log(updates[1].id);
      let docRef = projectFirestore.collection("playlists").doc(updates[1].id)
      console.log(updates);
      try {
        const res = await docRef.update(updates[0])
        // isPending.value = false
        return res
      }
      catch (err) {
        console.log(err.message)
        // isPending.value = false
        state.error = 'could not update the document'
      }
    }
  }

}
export default doc